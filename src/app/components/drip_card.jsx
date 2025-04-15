"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import { FlagContext } from '../contexts/flagcontext'
import { useRouter } from 'next/navigation';
import { size_array } from '../../../public/imports';

export default function DripCard({ drip_image, product_name, product_price, index, id }) {
    const { location } = useContext(FlagContext);
    const router = useRouter();


    return (
        <div className='drip-card-main' onClick={() => router.push(`${id}`)}>
            <div className="drip-card-container">
                <div className="image">
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
                            <div className="sizes">
                                {
                                    size_array.map((item, index) => (
                                        <p key={`drip_sizes${index}`}>{item}</p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='three'>
                            <button>Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
