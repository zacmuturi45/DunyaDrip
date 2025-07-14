"use client"

import React, { useRef, useState } from 'react'
import Featured_Card from '../components/featured_card'
import Image from 'next/image'
import { useCart } from '../contexts/cart_context'
import supabse_image_path from '@/utils/supabase/supabse_image_path'
import { useSort } from '../contexts/sort_context'
import { useRouter } from 'next/navigation'

export default function Featured() {
    const [carousel_index, setCarouselIndex] = useState(0);
    const carousel_ref = useRef(null);
    const { product, loadingProducts } = useCart();
    const { setExclusiveFilter, setProductType } = useSort();
    const router = useRouter();

    const scrollToIndex = (newIndex) => {
        if (carousel_ref.current) {
            const scrollAmount = newIndex * carousel_ref.current.clientWidth;
            carousel_ref.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const nextSlide = () => {
        if (carousel_index < 10) {
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

    const handleClick = () => {
        setExclusiveFilter(null, null)
        setProductType("")
        router.push("/drip")
    }

    return (
        <div className='featured-main'>
            <div className="featured-container">
                <div className="featured-main-title">
                    <div className="featured-main-title-container">
                        <h3>Featured</h3>
                        <div className="featured-main-sub-title">
                            <p onClick={handleClick}>See All</p>
                            <Image src={supabse_image_path('/arrow_right.svg')} width={100} height={100} alt='arrow-right-svg' className='featured-arrow' />
                        </div>
                    </div>
                    <div className="featured-main-title-navigation">
                        <Image src={supabse_image_path('/arrow.svg')} width={20} height={20} alt='arrow-svg' onClick={prevSlide} />
                        <Image src={supabse_image_path('/arrow.svg')} width={20} height={20} alt='arrow-svg' onClick={(nextSlide)} />
                    </div>
                </div>
                <div className="featured-cards">
                    <div className="carousel" ref={carousel_ref}>
                        {loadingProducts
                            ? (
                                (
                                    [...Array(12)].map((_, idx) => (
                                        <div className="featured-card-skeleton" key={idx}>
                                            <div className="skeleton-image" />
                                            <div className="skeleton-text" />
                                        </div>
                                    ))
                                )
                            ) : (
                                product.slice(0, 10).map((item, index) => {
                                    return <Featured_Card image={item.image_url} id={item.id} image2={item.image_url2} product_name={item.name} product_price={item.price} key={index} index={`mens${index}`} />
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
