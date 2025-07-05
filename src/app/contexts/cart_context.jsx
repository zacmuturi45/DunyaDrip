"use client"

import { supabase_client } from "@/utils/supabase/clint";
import supabse_image_path from "@/utils/supabase/supabse_image_path";

const { createContext, useState, useContext, useEffect } = require("react")

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [show_cart, setShowCart] = useState(false);
    const [loader, setLoader] = useState(false);
    const [totalz, setTotalz] = useState(0);
    const supabase = supabase_client()
    const [product, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [filteredProduct, setFilteredProduct] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true)
            let ext_drip_array = []
            const { data, error } = await supabase.from('all_products').select();
            if (error) console.error('Fetch error:', error);
            if (!data || data.length === 0) {
                console.error("No fetches for youuu")
                return;
            }
            ext_drip_array = Array.from({ length: 80 }, (_, index) => {
                const item = data[index % data.length];
                return {
                    ...item,
                    id: 100 + index,
                    image_url: item.image_url ? supabse_image_path(`/${item.image_url}`) : null,
                    product_type: item.product_type,
                    color: item.color,
                    size: item.size,
                    season: item.season,
                    category: item.category,
                    description: item.description,
                    niche: item.niche,
                };
            })
            setProducts(ext_drip_array)
            setFilteredProduct(ext_drip_array)
            setLoadingProducts(false);
        };
        fetchProducts()
    }, []);



    const addToCart = (item, operation = null) => {
        setCart((prevCart) => {
            const existing_product = prevCart.find(
                (i) => i.id === item.id && i.size === item.size
            );
            if (existing_product) {
                return prevCart.map((i) =>
                    i.id === item.id && i.size === item.size ? (operation ? (operation === "add" ? { ...i, quantity: i.quantity + 1 } : { ...i, quantity: Math.max(i.quantity - 1, 0) }) : item) : i
                ).filter(item => item.quantity > 0)
            }
            return [...prevCart, item];
        })
    };

    const remove_from_cart = (item) => {
        setCart((prevCart) => {
            return prevCart.filter((i) => !(item.id === i.id && item.size === i.size))
        });
    };

    const clear_cart = () => setCart([]);

    return (
        <CartContext.Provider value={{ product, totalz, setTotalz, loader, setLoader, cart, setCart, addToCart, remove_from_cart, clear_cart, show_cart, setShowCart, loadingProducts, filteredProduct, setFilteredProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};