"use client";

import { useState } from "react";
import Image from "next/image";
import { amex, diners, discover, elo, gpay, klarna, mastercard, paypal2, redirect_image, unionpay, visa } from "../../../public/imports";
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "../contexts/cart_context";
import { useAuth } from "../contexts/auth_context";
import toast from "react-hot-toast";
import supabse_image_path from "@/utils/supabase/supabse_image_path";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const paymentMethods = [
    { id: "credit_card", label: "Credit Card" },
    { id: "paypal", label: "Paypal" },
    { id: "google_pay", label: "Google Pay" },
    { id: "klarna", label: "Klarna" },
];



export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState("credit_card");
    const [useShippingAddress, setUseShippingAddress] = useState(true);
    const [showmore, setShowMore] = useState(false);
    const [expiry, setExpiry] = useState("");
    const { cart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const { display_name, user_email } = useAuth();


    const handleCreditCardPayments = async () => {
        if (cart.length <= 0) {
            toast.error('Your cart is emtpy')
            return;
        }

        setIsProcessing(true);

        const items = cart.map((item) => ({
            name: item.product_name,
            amount: item.product_price * 100,
            quantity: item.quantity,
            size: item.size
        }));

        try {
            const stripe = await stripePromise;

            const response = await fetch('/api/checkout-sessions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    customer_email: user_email || 'Guest',
                    customer_name: display_name || 'Guest',
                }),
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
                setIsProcessing(false);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            setIsProcessing(false);
        }
    };


    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4)
        }
        setExpiry(value.slice(0, 5));
    }

    const renderPaymentDetails = () => {
        switch (selectedPayment) {
            case "credit_card":
                return (
                    <div className="payment-details">
                        <div className="input-grid">
                            <input type="text" placeholder="Cardholder Name" className="input" />
                            <input type="text" placeholder="Card Number" className="input" />
                            <input type="text" autoComplete="cc-exp" value={expiry} onChange={handleChange} placeholder="Expiry Date (MM/YY)" className="input" />
                            <input type="text" placeholder="CVC" className="input" />
                        </div>

                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="billingAddress"
                                checked={useShippingAddress}
                                onChange={() => setUseShippingAddress(!useShippingAddress)}
                            />
                            <label htmlFor="billingAddress">Use shipping address as billing address</label>
                        </div>

                        {!useShippingAddress && (
                            <div className="billing-form">
                                <input type="text" placeholder="Billing Address Line 1" className="input" />
                                <input type="text" placeholder="Billing Address Line 2" className="input" />
                                <input type="text" placeholder="City" className="input" />
                                <input type="text" placeholder="State" className="input" />
                                <input type="text" placeholder="Postal Code" className="input" />
                                <input type="text" placeholder="Country" className="input" />
                            </div>
                        )}
                    </div>
                );
            case "paypal":
                return (
                    <div className="redirect-message">
                        <Image src={redirect_image} width={100} height={100} alt="redirect_image" className="redirect_image" />
                        <p>After clicking “Pay with Paypal”, you will be redirected to PayPal to complete your purchase securely.
                        </p>
                    </div>
                );
            case "google_pay":
                return (
                    <div className="redirect-message">
                        <Image src={supabse_image_path('/redirect.svg')} width={100} height={100} alt="redirect_image" className="redirect_image" />
                        <p>After clicking “Pay with Google Pay”, you will be redirected to Google Pay to complete your purchase securely.</p>
                    </div>
                );
            case "klarna":
                return (
                    <div className="redirect-message">
                        <Image src={supabse_image_path('/redirect.svg')} width={100} height={100} alt="redirect_image" className="redirect_image" />
                        <p>After clicking “Pay with Klarna”, you will be redirected to Klarna to complete your purchase securely.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderButton = () => {
        let buttonText = "";
        let buttonClass = "";

        switch (selectedPayment) {
            case "credit_card":
                buttonText = isProcessing ? "Processing..." : "Pay Now";
                buttonClass = "pay-button black";
                break;
            case "paypal":
                buttonText = isProcessing ? "Processing..." : "Pay with PayPal";
                buttonClass = "pay-button paypal";
                break;
            case "google_pay":
                buttonText = isProcessing ? "Processing..." : "Pay with Google Pay";
                buttonClass = "pay-button googlepay";
                break;
            case "klarna":
                buttonText = isProcessing ? "Processing..." : "Pay with Klarna";
                buttonClass = "pay-button klarna";
                break;
            default:
                break;
        }

        return (
            <button
                onClick={handleCreditCardPayments}
                className={buttonClass}
                disabled={isProcessing}
            >
                {buttonText}
            </button>
        );
    };


    return (
        <div className="payment-container">
            <h2 className="payment-title">Payment</h2>

            {paymentMethods.map((method) => (
                <div key={method.id} className="payment-method">
                    <div
                        onClick={() => setSelectedPayment(method.id)}
                        className="payment-tab"
                    >
                        <div className="tab-left">
                            <div className="circle-outer">
                                {selectedPayment === method.id && <div className="circle-inner" />}
                            </div>
                            <span className="tab-label">{method.label}</span>
                        </div>

                        {
                            method.id === "klarna" && (
                                <div className="logos_zero">
                                    <Image src={supabse_image_path('/klarna.svg')} alt="paypal2" width={60} height={60} />
                                </div>
                            )
                        }

                        {
                            method.id === "google_pay" && (
                                <div className="logos_zero">
                                    <Image src={supabse_image_path('/gpay.svg')} alt="paypal2" width={60} height={60} />
                                </div>
                            )
                        }

                        {
                            method.id === "paypal" && (
                                <div className="logos_zero">
                                    <Image src={supabse_image_path('/paypal.svg')} alt="paypal2" width={60} height={60} />
                                </div>
                            )
                        }

                        {method.id === "credit_card" && (
                            <div className="logos">
                                <Image src={supabse_image_path('/visa.svg')} alt="Visa" width={40} height={24} />
                                <Image src={supabse_image_path('/amex.svg')} alt="Amex" width={40} height={24} />
                                <Image src={supabse_image_path('/mastercard.svg')} alt="MasterCard" width={40} height={24} />
                                <div className="four_more" onMouseEnter={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)}>
                                    <p>4+</p>
                                </div>
                                {
                                    showmore && (
                                        <div className="more_logos">
                                            <Image src={supabse_image_path('/discover.svg')} alt="Visa" width={40} height={24} />
                                            <Image src={supabse_image_path('/diners.svg')} alt="Amex" width={40} height={24} />
                                            <Image src={supabse_image_path('/elo.svg')} alt="MasterCard" width={40} height={24} />
                                            <Image src={supabse_image_path('/unionpay.svg')} alt="UnionPay" width={40} height={24} />
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {selectedPayment === method.id && (
                        <div className="payment-content">
                            {renderPaymentDetails()}
                        </div>
                    )}
                </div>
            ))}

            <div className="button-wrapper">
                {renderButton()}
            </div>

            <div className="legal_checkout">
                <p>Refund Policy</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    );
}
