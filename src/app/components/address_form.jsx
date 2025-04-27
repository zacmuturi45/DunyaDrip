'use client';

import { countries } from "../../../public/imports";


export default function AddressForm({
    formData,
    setFormData,
    formTitle,
    onSubmit,
    submitButtonLabel = 'Submit',
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            {formTitle && <h2>{formTitle}</h2>}

            {/* Country */}
            <div className="form-group">
                <label>Country / Region</label>
                <select name="country" value={formData.country} onChange={handleChange}>
                    {countries.map((c, index) => (
                        <option key={index} value={c.country_value}>
                            {c.country_value}
                        </option>
                    ))}
                </select>
            </div>

            {/* First and Last Name */}
            <div className="form-row">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                    />
                </div>
            </div>

            {/* Address 1 and 2 */}
            <div className="form-row">
                <div className="form-group">
                    <label>Address Line 1</label>
                    <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        placeholder="House number and street name"
                    />
                </div>
                <div className="form-group">
                    <label>Address Line 2 (Optional)</label>
                    <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        placeholder="Apartment, suite, etc."
                    />
                </div>
            </div>

            {/* City and Postal Code */}
            <div className="form-row">
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                </div>
                <div className="form-group">
                    <label>Postal Code (Optional)</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="Postal Code"
                    />
                </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                />
            </div>

            {/* Submit Button */}
            {/* <button type="submit" className="submit-btn">
                {submitButtonLabel}
            </button> */}
        </form>
    );
}
