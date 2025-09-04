"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "../contexts/cart_context";
import { useAuth } from "../contexts/auth_context";
import toast from "react-hot-toast";
import supabse_image_path from "@/utils/supabase/supabse_image_path";
import PayPalButton from "./PaypalButton";
import Link from "next/link";
import ShippingModal from "./shipping_modal";
import { createClient } from "@/utils/supabase/client";
import Cookies from "js-cookie";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const paymentMethods = [
    { id: "credit_card", label: "Credit Card" },
    { id: "paypal", label: "Paypal" },
    // { id: "google_pay", label: "Google Pay" },
    // { id: "klarna", label: "Klarna" },
];



export default function Payment({ shippingDetails }) {
    const [selectedPayment, setSelectedPayment] = useState("credit_card");
    const [useShippingAddress, setUseShippingAddress] = useState(true);
    const [showmore, setShowMore] = useState(false);
    const [expiry, setExpiry] = useState("");
    const { cart, shippingOption, setShippingOption, setCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const { display_name, user_email, show_shipping_button, setShowShippingButton, unloggedUserEmail, user } = useAuth();
    const supabase = createClient;

    useEffect(() => {
        if (show_shipping_button) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
        // Cleanup in case the component unmounts while panel is open
        return () => {
            document.body.style.overflow = '';
        }
    }, [show_shipping_button]);

    const handleCreditCardPayments = async () => {
        if (cart.length <= 0) {
            toast.error('Your cart is empty')
            return;
        }

        setIsProcessing(true);

        const items = cart.map((item) => ({
            name: item.product_name,
            amount: item.product_price * 100,
            quantity: item.quantity,
            size: item.size,
            image: item.drip_image,
        }));

        let orderId = null;

        try {
            const { data, error } = await supabase
                .from('client_orders')
                .insert([
                    {
                        user_id: user?.id || null,
                        products: items,
                        status: 'pending',
                        email: user_email || unloggedUserEmail,
                        shipping_details: shippingDetails || null,
                        shipping_option: shippingOption || null,
                    }
                ])
                .select();

            if (error || !data || !data[0]) {
                toast.error("Failed to create order. Please try again.");
                setIsProcessing(false);
                return;
            };

            orderId = data[0].id;
        } catch (err) {
            toast.error("Order creation error.");
            setIsProcessing(false);
            return;
        }

        try {
            const stripe = await stripePromise;

            const response = await fetch('/api/checkout-sessions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: orderId,
                    customer_email: user_email || unloggedUserEmail,
                    customer_name: display_name || undefined,
                    shippingOption: shippingOption || null,
                    items,
                }),
            });

            if (!response.ok) {
                const errorMsg = await response.json();
                toast.error(errorMsg.error || "Checkout failed");
                setIsProcessing(false);
                return;
            } else {
                const clearCart = async () => {
                    try {
                        // Clear local state first
                        setCart([]);

                        // Remove cookie
                        Cookies.remove('cart');

                        // Delete from Supabase if user is logged in
                        if (user?.id) {
                            const supabase = createClient;
                            const { error } = await supabase
                                .from('user_carts')
                                .delete()
                                .eq('user_id', user.id);

                            if (error) throw error;

                            console.log('Supabase cart deleted successfully');
                        }

                    } catch (error) {
                        console.error('Cart deletion failed:', {
                            error: error.message,
                            stack: error.stack,
                            supabaseError: error.code ? {
                                code: error.code,
                                details: error.details,
                                hint: error.hint
                            } : null
                        });
                    }
                };

                clearCart();
            }

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

    const handlePayPalSuccess = (details) => {
        toast.success("Payment completed!");
    };

    const handlePayPalError = (err) => {
        toast.error("Paypal payment failed!");
        console.error(err);
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
                    <div className="redirect-message">
                        <Image src={supabse_image_path('/cards.svg')} width={100} height={100} alt="redirect_image" className="redirect_image" />
                        <p>Fast, secure checkout with all major credit and debit cards.</p>
                    </div>
                );
            case "paypal":
                return (
                    <div className="paypal-section">
                        <PayPalButton
                            amount={cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0)}
                            onSuccess={handlePayPalSuccess}
                            onError={handlePayPalError}
                        />
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
                buttonText = isProcessing ? "Processing..." : "Pay with Card";
                buttonClass = "pay-button black";
                break;
            // case "paypal":
            //     buttonText = isProcessing ? "Processing..." : "Pay with PayPal";
            //     buttonClass = "pay-button paypal";
            //     break;
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
                onClick={() => {
                    setShippingOption(prev => ({
                        ...prev,
                        is_set: false
                    }));
                    if (!shippingOption["is_set"]) {
                        setShowShippingButton(true)
                    } else {
                        handleCreditCardPayments()
                    }
                }}
                className={buttonClass}
                disabled={isProcessing}
            >
                {shippingOption["is_set"] ? "Pay Now" : buttonText}
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

            <div className={selectedPayment === "paypal" ? "no_display" : "button-wrapper"}>
                {renderButton()}
            </div>

            {
                show_shipping_button && <ShippingModal />
            }

            <div className="legal_checkout">
                <Link className="next-link" href={"/orders_returns"}><p>Refund Policy</p></Link>
                <Link className="next-link" href={"/PrivacyPolicy"}><p>Privacy Policy</p></Link>
            </div>
        </div>
    );
}
