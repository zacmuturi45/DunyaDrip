"use client"

import React, { useContext, useState } from 'react'
import { useCart } from '../contexts/cart_context'
import AddressForm from '../components/address_form'
import Payment from '../components/payment_details'
import CartProduct from '../components/cart_product'
import { FlagContext } from '../contexts/flagcontext'

export default function CheckOut() {
    const { cart, totalz } = useCart();
    const { location } = useContext(FlagContext);
    const [checkoutForm, setCheckoutForm] = useState({
        country: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        phone: '',
    });
    const [promoCode, setPromoCode] = useState("");
    const [promoMessage, setPromoMessage] = useState("");

    const handleCheckoutSubmit = () => {
        console.log('Checkout Form Data:', checkoutForm);
        // ... do your checkout stuff
    };


    return (
        <div className='checkout_main'>
            <div className="checkout_container">

                {/* CHECKOUT_DIV_ONE */}
                <div className='checkout_div_one'>
                    <div className="checkout_div_one_container">
                        {/* <div className='checkout_title'>
                        <h1>Checkout</h1>
                        <p>{`Order subtotal (2 items): $300`}</p>
                    </div> */}

                        <div className='checkout_shipping_address'>

                            <div className='shipping_address_form'>
                                <AddressForm
                                    formData={checkoutForm}
                                    setFormData={setCheckoutForm}
                                    formTitle="Shipping Address"
                                    onSubmit={handleCheckoutSubmit}
                                    submitButtonLabel="Proceed to Payment"
                                />
                            </div>
                        </div>

                        <div className='checkout_payment_details'>

                            <div className="payment_form">
                                <Payment shippingDetails={checkoutForm} />
                            </div>
                        </div>
                    </div>

                </div>
                {/* END OF CHECKOUT_DIV_ONE */}


                {/* CHECKOUT_DIV_TWO */}
                <div className='checkout_div_two'>
                    <div className="checkout_div_two_container">
                        <div className='checkout_div_two_title'>
                            <h1>Summary</h1>

                            {/* <div className="promo-code-section">
                                <input
                                    type="text"
                                    className="promo-input"
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="apply-button"
                                    onClick={() => {
                                        if (promoCode.trim().toLowerCase() === "discount10") {
                                            setPromoMessage("Promo code applied! 10% discount.");
                                        } else {
                                            setPromoMessage("Invalid promo code.");
                                        }
                                    }}
                                >
                                    Apply
                                </button>
                                {promoMessage && <p className="promo-message">{promoMessage}</p>}
                            </div> */}

                            <div className="summary">
                                <div>
                                    <p>Subtotal</p>
                                    <p>{`${location.currency} ${totalz}`}</p>
                                </div>
                                <div>
                                    <p>Shipping</p>
                                    <p>Free</p>
                                </div>
                                <div className="total">
                                    <p>Total</p>
                                    <p>{`${location.currency} ${totalz+44}`}</p>
                                </div>
                            </div>

                        </div>

                        <div className='checkout_div_two_cards'>
                            <div className="cart_title">
                                <h2>{`Cart (${cart?.length || 0} items)`}</h2>
                            </div>
                            <div className="card_container">
                                {
                                    cart.map((item, index) => (
                                        <CartProduct key={index} cart_image={item.drip_image} cart_item_title={item.product_name} cart_item_price={item.product_price} cart_item_size={item.size} id={item.id} cart_item_quantity={item.quantity} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* CHECKOUT_DIV_TWO */}

            </div>
        </div>
    )
}
