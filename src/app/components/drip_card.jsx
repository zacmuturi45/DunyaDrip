"use client"

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { FlagContext } from '../contexts/flagcontext'
import { useRouter } from 'next/navigation';
import { finger, size_array } from '../../../public/imports';
import { useCart } from '../contexts/cart_context';

export default function DripCard({ drip_image, product_name, product_price, index, id }) {
    const { location } = useContext(FlagContext);
    const router = useRouter();
    const [selected_size, setSelectedSize] = useState({ size: null, index: null });
    const { addToCart, setShowCart } = useCart();
    const [show_finger, setShowFinger] = useState(false);

    const add_cart_object = () => {
        if (!selected_size.size) {
            setShowFinger(true)
            setTimeout(() => {
                setShowFinger(false)
            }, 3000);
            return;
        }

        addToCart({
            drip_image,
            product_name,
            product_price,
            id,
            size: selected_size.size,
            quantity: 1
        });
        setSelectedSize(prev => ({
            ...prev,
            index: null
        }))
        setShowCart(true)
    }


    return (
        <div className='drip-card-main'>
            <div className="drip-card-container">
                <div className="image" onClick={() => router.push(`/${id}`)}>
                    <Image src={drip_image} width={100} height={100} unoptimized alt='drip-image' />
                </div>
                <div className="drip-info">
                    <div className='one'>
                        <p>{product_name}</p>
                        <p>{`${location.currency} ${product_price}`}</p>
                    </div>

                    <div className="hide-div">
                        <div className='two'>
                            <p>Size</p>
                            {
                                show_finger && (
                                    <div className="size_alert">
                                        <div className="thumbs-down">
                                            <Image src={finger} width={20} height={20} alt='finger-svg' className='floating' />
                                        </div>
                                        Please select size.
                                    </div>
                                )
                            }
                            <div className="sizes">
                                {
                                    size_array.map((item, index) => (
                                        <p key={`drip_sizes${index}`} onClick={() => setSelectedSize(prevState => ({
                                            ...prevState,
                                            size: item,
                                            index: index
                                        }))} className={selected_size.index === index ? "black_p" : ""} >{item}</p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='three'>
                            <button onClick={() => {
                                add_cart_object()
                            }}>Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
