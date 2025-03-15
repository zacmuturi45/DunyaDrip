"use client"

import React from 'react'
import { arrow_right, featured_array } from '../../../public/imports'
import Featured_Card from '../components/featured_card'
import Image from 'next/image'

export default function Featured() {

    return (
        <div className='featured-main'>
            <div className="featured-container">
                <div className="featured-main-title">
                    <h3>New Arrivals</h3>
                    <div className="featured-main-sub-title">
                        <p>See All</p>
                        <Image src={arrow_right} width={100} height={100} alt='arrow-right-svg' className='featured-arrow' />
                    </div>
                </div>
                <div className="featured-cards">
                    {
                        featured_array.map((item, index) => (
                            <Featured_Card image={item.image} id={item.id} image2={item.image2} product_name={item.product_name} product_price={item.product_price} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
