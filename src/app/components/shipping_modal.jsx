import React, { useState, useContext } from 'react';
import { useCart } from '../contexts/cart_context';
import { useAuth } from '../contexts/auth_context';
import Loader from './loader';
import Spinner from './spinner';

const SHIPPING_RATES = {
    UK: {
        Standard: 3.99,
        Express: 6.99,
        "Next Day": 8.99
    },
    International: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    }
};

export default function ShippingModal({ onClose }) {
    const [region, setRegion] = useState('UK');
    const [method, setMethod] = useState('');
    const { setShippingOption, shippingOption } = useCart();
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
                        <option value="UK">UK</option>
                        <option value="International">International</option>
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
