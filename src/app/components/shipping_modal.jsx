import React, { useState, useContext } from 'react';
import { useCart } from '../contexts/cart_context';
import { useAuth } from '../contexts/auth_context';
import { countries_we_ship_to, SHIPPING_RATES } from '../../../public/imports';


export default function ShippingModal({ onClose }) {
    const [method, setMethod] = useState('');
    const { setShippingOption, region, setRegion } = useCart();
    const { setShowShippingButton } = useAuth();
    const [setLoader, setSetLoader] = useState(false);

    const handleConfirm = () => {
        if (!method) return alert("Please select a delivery method");
        const price = SHIPPING_RATES[region][method];
        setSetLoader(true)
        setShippingOption(prev => ({
            ...prev,
            region,
            method,
            price: price,
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
                <div className="section">
                    <label>Region:</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
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
                        <div key={opt}>
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
