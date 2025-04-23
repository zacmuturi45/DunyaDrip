"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useCart } from '../contexts/cart_context'
import Image from 'next/image';
import { shopping_bag, x } from '../../../public/imports';
import CartProduct from './cart_product';
import { FlagContext } from '../contexts/flagcontext';
import Loader from './loader';

export default function CartPage() {
    const { cart, show_cart, setShowCart, loader, setLoader } = useCart();
    const { location } = useContext(FlagContext);
    const [sub_total, setSubTotal] = useState([]);
    const [totalz, setTotalz] = useState(0);

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

    return (
        <div className={show_cart ? "cart_page_main" : "hide_cart_page"}>
            <div className="cart_page_container">
                <div className="carty">
                    <div className="cart_page_one">
                        <h3>My Cart <span>{cart.length > 0 && <>{`(${cart.length})`}</>}</span></h3>
                        <div className="escape">
                            <Image src={x} width={30} height={30} alt='cancel' onClick={() => setShowCart(false)} />
                        </div>
                    </div>

                    <div className="cart_page_two">
                        {
                            cart.length > 0 ? (
                                <>
                                    {
                                        cart.map((item, index) => (
                                            <CartProduct key={index} setSubTotal={setSubTotal} cart_image={item.drip_image} cart_item_title={item.product_name} cart_item_price={item.product_price} cart_item_size={item.size} id={item.id} cart_item_quantity={item.quantity} />
                                        ))
                                    }
                                </>
                            ) : (
                                <div className='shopping_bag'>
                                    <Image src={shopping_bag} width={100} height={100} alt='shopping_bag' />
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
                                        loader ? <Loader /> : <p>{`${location.currency} ${totalz}`}</p>
                                    }
                                </div>
                                {/* <div className="total">
                            <p>Total</p>
                            <p>$661</p>
                        </div> */}
                            </div>

                            <div className="footer-two">
                                <button>Checkout</button>
                                <p onClick={() => setShowCart(false)}>Or Continue Shopping</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
