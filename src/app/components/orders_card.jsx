import React from 'react'
import Image from 'next/image'
import { ESTIMATED_TIME } from '../../../public/imports'

export default function OrdersCard({ identifier, cart_item_title, cart_item_size, cart_item_quantity, cart_item_price, image, delivery_status, shippingOption, createdAt }) {
    const statusColor = (stat) => {
        if (stat === 'delivered') {
            return 'green'
        } else if (stat === 'in-transit') {
            return 'orange'
        } else {
            return 'red'
        }
    }

    const calculate_delivery = (days_later) => {
        const dt = new Date(createdAt)

        dt.setDate(dt.getDate() + days_later)

        const formatted_date = dt.toLocaleDateString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })

        return formatted_date
    }
    return (
        <div className='orders_card_product_main' key={identifier}>
            <div className="orders_card_product_div">
                <div className="one"><Image src={image} width={100} height={100} alt='cart_image' unoptimized className='orders_card_image' /></div>
                <div className="orders_card_product_details">
                    <h4>{cart_item_title}</h4>
                    <p>{cart_item_price}</p>
                    <p><span>{`Size: ${cart_item_size}`}</span><span>{`Qty: ${cart_item_quantity}`}</span></p>
                </div>
            </div>

            <div className="mid_container">
                <div className="status">
                    <h5>Status</h5>
                    <p style={{ color: `${statusColor(delivery_status)}` }}>{delivery_status}</p>
                </div>

                <div className="delivery_date">
                    {
                        delivery_status === 'delivered' ? (
                            <>
                                <h5>Delivered on:</h5>
                                <p style={{ color: `${statusColor(delivery_status)}` }}>{calculate_delivery(ESTIMATED_TIME[shippingOption.region][shippingOption.method])}</p>
                            </>
                        ) : (
                            <>
                                <h5>Delivery Expected By</h5>
                                <p style={{ color: `${statusColor(delivery_status)}` }}>{calculate_delivery(ESTIMATED_TIME[shippingOption.region][shippingOption.method])}</p>
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    )
}