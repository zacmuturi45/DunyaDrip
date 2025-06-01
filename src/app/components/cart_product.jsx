"use client"

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FlagContext } from '../contexts/flagcontext';
import { x } from '../../../public/imports';
import { useCart } from '../contexts/cart_context';
import { useRouter } from 'next/navigation';

export default function CartProduct({ cart_image, cart_item_title, cart_item_size, cart_item_price, id, cart_item_quantity }) {
    const [quantity, setQuantity] = useState(1)
    const [price_object, setPriceObject] = useState({ id: id, total_price: cart_item_price });
    const { location } = useContext(FlagContext);
    const { remove_from_cart, setCart, addToCart } = useCart();
    const router = useRouter()
    console.log(`Olaaaaaiiii ${cart_image}`)

    const handleQuantity = (operation) => {
        addToCart({ id: id, size: cart_item_size, drip_image: cart_image, product_name: cart_item_title, product_price: cart_item_price }, operation)
    };

    const clear_cart_object = () => {
        remove_from_cart({
            id: id,
            size: cart_item_size
        });
    };

    return (
        <div className='cart_product_main'>
            <div className="cart_product_div">
                <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${cart_image}`} width={100} height={100} alt='cart_image'/>
            </div>

            <div className="cart_product_details">
                <h4>{cart_item_title}</h4>
                <p>{`${location.currency} ${cart_item_price * cart_item_quantity}`}</p>
                <p>Size: <span>{cart_item_size}</span></p>

                <div className="qtty">
                    <div className='spn-1' onClick={() => handleQuantity("add")}>+</div>
                    <p>{cart_item_quantity}</p>
                    <div className='spn-2' onClick={() => handleQuantity("minus")}>-</div>
                </div>
            </div>

            <div className="escape-x">
                <Image src={x} width={30} height={30} alt='cancel' className='escape_x' onClick={() => clear_cart_object()} />
            </div>
        </div>
    )
}
