import React from 'react'
import { shippingData } from '../../../public/imports'

export default function InternationalShipping() {
    return (
        <div className='orders_returns'>
            <div className="orders-returns-page">
                <h1>International Shipping</h1>
                <p>
                    Dunya Drip currently ships to all EU countries and the USA. Please review our international shipping policies below, including the list of countries we ship to, delivery times, and costs.
                </p>

                <section>
                    <h2>Countries We Ship To</h2>
                    <p>
                        We currently ship to the following countries:
                    </p>
                    <ul className="shipping-countries-list">
                        {shippingData.map(row => (
                            <li key={row.country}>{row.country}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Shipping Rates &amp; Estimated Delivery Times</h2>
                    <div className="shipping-table-wrapper">
                        <table className="shipping-table">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Price from UK</th>
                                    <th>Estimated Delivery Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shippingData.map(row => (
                                    <tr key={row.country}>
                                        <td>{row.country}</td>
                                        <td>{row.price}</td>
                                        <td>{row.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2>Important International Delivery Notes</h2>
                    <ul>
                        <li>
                            <strong>Dispatch:</strong> Orders are dispatched Monday to Friday, excluding UK public holidays.
                        </li>
                        <li>
                            <strong>Customs, Duties &amp; Taxes:</strong> International orders may be subject to customs duties, taxes, or import fees. These charges are the customer&apos;s responsibility and are not included in the item price or shipping cost.
                        </li>
                        <li>
                            <strong>Tracking:</strong> All international orders are sent with tracking. You will receive tracking details in your dispatch email.
                        </li>
                        <li>
                            <strong>Incorrect Address:</strong> Please ensure your shipping address and contact details are accurate. We are not responsible for delivery issues caused by incorrect information.
                        </li>
                        <li>
                            <strong>Remote Areas:</strong> Delivery to remote locations may take longer and could incur additional charges.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Questions or Support</h2>
                    <ul>
                        <li>
                            <strong>Need Help?</strong> If you have any questions about international shipping, contact us at <a href="mailto:support@dunyadrip.com">support@dunyadrip.com</a>. We&apos;re happy to assist!
                        </li>
                    </ul>
                </section>

                <p className="thank-you">Thank you for shopping with Dunya Drip. We deliver to the EU and USA!</p>
            </div>
        </div>
    )
}
