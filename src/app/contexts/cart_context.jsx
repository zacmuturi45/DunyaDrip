"use client"

import supabse_image_path from "@/utils/supabase/supabse_image_path";
import Cookies from "js-cookie";
import { useAuth } from "./auth_context";
import { createClient } from "@/utils/supabase/client";

const { createContext, useState, useContext, useEffect } = require("react")

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [show_cart, setShowCart] = useState(false);
    const [loader, setLoader] = useState(false);
    const [totalz, setTotalz] = useState(0);
    const [product, setProducts] = useState([]);
    const { user } = useAuth();
    const [region, setRegion] = useState('UK');
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [filteredProduct, setFilteredProduct] = useState([])
    const [shippingOption, setShippingOption] = useState({ region: "UK", method: "Standard", price: 9.99, is_set: null });

    useEffect(() => {
        const loadCartFromDB = async () => {
            if (user) {
                const { data, error } = await createClient
                    .from('user_carts')
                    .select('carts')
                    .eq('user_id', user.id)
                    .single();
                if (data?.carts) {
                    setCart(data.carts);
                    Cookies.remove('cart');
                }
            }
        };
        loadCartFromDB();
    }, [user]);

    useEffect(() => {
        const savedCart = Cookies.get('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [])

    useEffect(() => {
        const updateCartInDB = async () => {
            if (user && cart.length > 0) {
                try {
                    const { data, error } = await createClient
                        .from('user_carts')
                        .upsert([
                            { user_id: user.id, carts: cart }
                        ])
                        .select();

                    if (error) {
                        console.error('Error updating cart:', error);
                        return;
                    }

                    console.log('Cart updated successfully:', data);
                } catch (err) {
                    console.error('Unexpected error:', err);
                }
            }
        };

        updateCartInDB();
    }, [cart, user]);

    useEffect(() => {
        if (!user) {
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
        }
    }, [cart, user]);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true)
            let ext_drip_array = []
            const { data, error } = await createClient.from('all_products').select();
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
                    image_url: item.image_url ? supabse_image_path(`${item.image_url2}`) : null,
                    product_type: item.product_type,
                    color: item.color,
                    size: item.size,
                    season: item.season,
                    category: item.category,
                    description: item.description,
                    niche: item.niche,
                    image_url2: item.image_url2 ? supabse_image_path(`${item.image_url2}`) : null,
                    price: (item.price * 0.2) + item.price,
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
        <CartContext.Provider value={{ region, setRegion, shippingOption, setShippingOption, product, totalz, setTotalz, loader, setLoader, cart, setCart, addToCart, remove_from_cart, clear_cart, show_cart, setShowCart, loadingProducts, filteredProduct, setFilteredProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};