import React, { useState } from 'react';
import { useCart } from '../contexts/cart_context';
import { useAuth } from '../contexts/auth_context';
import { countries_we_ship_to, SHIPPING_RATES } from '../../../public/imports';

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ShippingModal({ onClose }) {
    const [method, setMethod] = useState('');
    const { setShippingOption, region, setRegion } = useCart();
    const { setShowShippingButton, user, setUnloggedUserEmail } = useAuth();
    const [setLoader, setSetLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const isLoggedIn = !!user;

    const handleConfirm = () => {
        if (!method) return alert("Please select a delivery method");
        if (!isLoggedIn) {
            if (!email) {
                setEmailError("Email is required");
                return;
            }
            if (!validateEmail(email)) {
                setEmailError("Please enter a valid email address");
                return;
            }
        }
        setEmailError('');
        const price = SHIPPING_RATES[region][method];
        setSetLoader(true)
        setShippingOption(prev => ({
            ...prev,
            region,
            method,
            price: price,
            email: isLoggedIn ? user.email : email,
            is_set: true
        }));
        setTimeout(() => {
            setSetLoader(false)
            setShowShippingButton(false)
        }, 1000);
    };

    return (
        <div className="shipping-modal-backdrop">
            <div className="shipping-modal">
                <h2>Select Shipping</h2>
                {!isLoggedIn && (
                    <div className="section">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                setUnloggedUserEmail(e.target.value);
                                setEmailError('');
                            }}
                            placeholder="Enter your email"
                            required
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                        {emailError && (
                            <div className="email-error">
                                {emailError}
                            </div>
                        )}
                    </div>
                )}
                <div className="section" id='region-select'>
                    <label>Region:</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} id='region-select-input'>
                        {
                            countries_we_ship_to.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="section">
                    <label>Delivery Method:</label>
                    {Object.keys(SHIPPING_RATES[region]).map((opt) => (
                        <div key={opt} id='method-select'>
                            <input
                                type="radio"
                                name="method"
                                value={opt}
                                checked={method === opt}
                                onChange={(e) => setMethod(e.target.value)}
                                required
                            />
                            <label>{opt} — £{SHIPPING_RATES[region][opt].toFixed(2)}</label>
                        </div>
                    ))}
                </div>
                <button id='ship_one' onClick={handleConfirm}>{setLoader ? "Loading..." : "Confirm Shipping"}</button>
                <button onClick={() => setShowShippingButton(false)}>Cancel</button>
            </div>
        </div>
    );
}