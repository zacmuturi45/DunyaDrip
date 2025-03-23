"use client"

import React, { useRef, useState } from 'react'
import { arrow, arrow_right, featured_array } from '../../../public/imports'
import Featured_Card from '../components/featured_card'
import Image from 'next/image'

export default function WomensArrivals() {
    const [carousel_index, setCarouselIndex] = useState(0);
    const carousel_ref = useRef(null);

    const scrollToIndex = (newIndex) => {
        if(carousel_ref.current) {
            const scrollAmount = newIndex * carousel_ref.current.clientWidth;
            carousel_ref.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const nextSlide = () => {
        if (carousel_index < featured_array.length - 1) {
            setCarouselIndex(carousel_index + 1);
            scrollToIndex(carousel_index + 1)
        }
    }

    const prevSlide = () => {
        if (carousel_index > 0) {
            setCarouselIndex(carousel_index - 1);
            scrollToIndex(carousel_index - 1)
        }
    };

    return (
        <div className='featured-main'>
            <div className="featured-container">
                <div className="featured-main-title">
                    <div className="featured-main-title-container">
                        <h3>Women&apos;s New Arrivals</h3>
                        <div className="featured-main-sub-title">
                            <p>See All</p>
                            <Image src={arrow_right} width={100} height={100} alt='arrow-right-svg' className='featured-arrow' />
                        </div>
                    </div>
                    <div className="featured-main-title-navigation">
                        <Image src={arrow} width={20} height={20} alt='arrow-svg' onClick={prevSlide} />
                        <Image src={arrow} width={20} height={20} alt='arrow-svg' onClick={(nextSlide)} />
                    </div>
                </div>
                <div className="featured-cards">
                    <div className="carousel" ref={carousel_ref}>
                        {
                            featured_array.map((item, index) => (
                                <Featured_Card image={item.image} id={item.id} image2={item.image2} product_name={item.product_name} product_price={item.product_price} key={index} index={`womens${index}`} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
