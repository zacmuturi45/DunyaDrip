import React from 'react'
import "../css/index.css"

export default function OrdersReturns() {
    return (
        <div className='orders_returns'>
            <div className="orders-returns-page">
                <h1>Orders &amp; Returns</h1>
                <p>
                    Welcome to Dunya Drip&apos;s Orders &amp; Returns page. We aim to make your shopping experience smooth and worry-free. Please review our policies below for everything you need to know about ordering, returns, and exchanges.
                </p>

                <section>
                    <h2>Placing an Order</h2>
                    <ul>
                        <li>
                            <strong>Order Confirmation:</strong> After placing your order, you&apos;ll receive an email confirmation with your order details.
                        </li>
                        <li>
                            <strong>Order Processing:</strong> Orders are typically processed within 1-2 business days. Orders placed after 2pm or on weekends will be processed the next business day.
                        </li>
                        <li>
                            <strong>Amendments &amp; Cancellations:</strong> Please double-check your details before submitting your order. Once placed, orders cannot be changed or cancelled as we strive to ship as quickly as possible.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Shipping &amp; Delivery</h2>
                    <ul>
                        <li>
                            <strong>Dispatch:</strong> Once your order has shipped, you&apos;ll receive a dispatch email with tracking information.
                        </li>
                        <li>
                            <strong>Delivery Times:</strong> Estimated delivery times are provided at checkout. Delays may occur during peak periods or due to courier issues.
                        </li>
                        <li>
                            <strong>International Orders:</strong> Customs or import duties may apply and are the customer&apos;s responsibility.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Returns &amp; Exchanges</h2>
                    <p>
                        We hope you love your Dunya Drip purchase, but if you need to return or exchange an item, here&apos;s how:
                    </p>
                    <ul>
                        <li>
                            <strong>Eligibility:</strong> Returns are accepted within 28 days of delivery. Items must be unworn, unwashed, and in their original packaging with tags attached.
                        </li>
                        <li>
                            <strong>Non-Returnable Items:</strong> Unboxed products and personalized products cannot be returned unless faulty.
                        </li>
                    </ul>
                    <h3>How to Return</h3>
                    <ol>
                        <li>
                            <strong>Initiate Return:</strong> Email us at <a href="mailto:support@dunyadrip.com">support@dunyadrip.com</a> with your order number and the reason for return.
                        </li>
                        <li>
                            <strong>Return Authorization:</strong> We will provide return instructions and a return address.
                        </li>
                        <li>
                            <strong>Package Items:</strong> Securely package your items. Include your name and order number in the parcel.
                        </li>
                        <li>
                            <strong>Shipping:</strong> Return shipping costs are the customer&apos;s responsibility unless the item is faulty or incorrect.
                        </li>
                    </ol>
                    <h3>Refunds</h3>
                    <ul>
                        <li>Refunds are processed within 7 business days after we receive and inspect your return.</li>
                        <li>Refunds will be issued to the original payment method.</li>
                        <li>Shipping charges are non-refundable unless your order was incorrect or faulty.</li>
                    </ul>
                    <h3>Exchanges</h3>
                    <p>
                        If you need a different size or color, please return your item for a refund and place a new order.
                    </p>
                </section>

                <section>
                    <h2>Faulty or Incorrect Items</h2>
                    <p>
                        If you receive a faulty or incorrect item, please email us at <a href="mailto:support@dunyadrip.com">support@dunyadrip.com</a> with your order number and photos of the issue. We&apos;ll resolve the problem promptly.
                    </p>
                </section>

                <section>
                    <h2>Additional Info</h2>
                    <ul>
                        <li>
                            <strong>Late or Missing Refunds:</strong> If you haven&apos;t received your refund, please first check with your bank or payment provider. If you still need assistance, contact us.
                        </li>
                        <li>
                            <strong>Questions?</strong> Our customer support team is here to help at <a href="mailto:support@dunyadrip.com">support@dunyadrip.com</a>.
                        </li>
                    </ul>
                </section>

                <p className="thank-you">Thank you for shopping with Dunya Drip!</p>
            </div>
        </div>
    )
}
