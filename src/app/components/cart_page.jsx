"use client"

import React, { useContext, useEffect } from 'react'
import { useCart } from '../contexts/cart_context'
import Image from 'next/image';
import CartProduct from './cart_product';
import { FlagContext } from '../contexts/flagcontext';
import Loader from './loader';
import { useRouter } from 'next/navigation';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartPage() {
    const { cart, show_cart, setShowCart, loader, setLoader, totalz, setTotalz } = useCart();
    const { location } = useContext(FlagContext);
    const router = useRouter();

    useEffect(() => {
        const sum_total = cart.reduce((acc, item) => {
            return acc + item.product_price * item.quantity;
        }, 0);
        setLoader(true)
        setTimeout(() => {
            setTotalz(sum_total)
            setLoader(false)
        }, 2000);
    }, [cart])

    useEffect(() => {
        if (show_cart) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = "";
        };

    }, [show_cart])

    const closePanel = () => {
        setShowCart(false);
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closePanel();
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    const panelVariants = {
        hidden: {
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        visible: {
            x: 0,
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    return (
        <AnimatePresence>
            {show_cart && (
                <motion.div
                    className="cart_page_main"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="cart_page_container"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="carty">
                            <div className="cart_page_one">
                                <h3>My Cart <span>{cart.length > 0 && <>{`(${cart.length})`}</>}</span></h3>
                                <div className="escape">
                                    <Image src={supabse_image_path('/x.svg')} width={30} height={30} alt='cancel' onClick={() => setShowCart(false)} />
                                </div>
                            </div>

                            <div className="cart_page_two">
                                {
                                    cart.length > 0 ? (
                                        <>
                                            {
                                                cart.map((item, index) => (
                                                    <CartProduct key={index} cart_image={item.drip_image} cart_item_title={item.product_name} cart_item_price={item.product_price} cart_item_size={item.size} id={item.id} cart_item_quantity={item.quantity} />
                                                ))
                                            }
                                        </>
                                    ) : (
                                        <div className='shopping_bag'>
                                            <Image src={supabse_image_path('/shopping_bag.svg')} width={100} height={100} alt='shopping_bag' />
                                            <p>Your Cart is empty</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {
                            cart.length > 0 && (
                                <div className="cart_footer">
                                    <div className="footer-one">
                                        <div className="sub">
                                            <p>Subtotal</p>
                                            {
                                                loader ? <Loader /> : <p className='universal_price'>{`£${totalz}`}</p>
                                            }
                                        </div>
                                        {/* <div className="total">
                            <p>Total</p>
                            <p>$661</p>
                        </div> */}
                                    </div>

                                    <div className="footer-two">
                                        <button onClick={() => {
                                            setShowCart(false)
                                            router.push("/checkout")
                                        }}>Checkout</button>
                                        <p onClick={() => setShowCart(false)}>Or Continue Shopping</p>
                                    </div>
                                </div>
                            )
                        }

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
