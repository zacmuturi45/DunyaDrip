"use client"

const { createContext, useState, useContext } = require("react")

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [show_cart, setShowCart] = useState(false);
    const [loader, setLoader] = useState(false);


    const addToCart = (item, operation=null) => {
        setCart((prevCart) => {
            const existing_product = prevCart.find(
                (i) => i.id === item.id && i.size === item.size
            );
            if (existing_product) {
                return prevCart.map((i) => 
                    i.id === item.id && i.size === item.size ? (operation ? (operation === "add" ? {...i, quantity: i.quantity + 1} : {...i, quantity: Math.max(i.quantity - 1, 0)}) : item) : i
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
        <CartContext.Provider value={{ loader, setLoader, cart, setCart, addToCart, remove_from_cart, clear_cart, show_cart, setShowCart }}>
            { children }
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};