"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { calculateTimeLeft } from '../../../public/imports'
import gsap from 'gsap';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import { useSort } from '../contexts/sort_context';
import { useRouter } from 'next/navigation';



export default function SummerSale() {
    const text_one = useRef(null);
    const text_two = useRef(null);
    const text_slider = useRef(null);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);
    const { setExclusiveFilter, setProductType } = useSort();
    const router = useRouter();


    let xPercent = 0;

    useEffect(() => {
        animation()
    }, [])

    const animation = () => {
        if (!text_one.current || !text_two.current) {
            requestAnimationFrame(animation)
            return;
        }

        if (xPercent <= -100) {
            xPercent = 0;
        }

        gsap.set(text_one.current, { xPercent: xPercent })
        gsap.set(text_two.current, { xPercent: xPercent })
        xPercent += -0.05;
        requestAnimationFrame(animation)
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        setIsClient(true)
    }, [timeLeft])

    const handleShopMen = () => {
        setExclusiveFilter("Men", null);
        setProductType("WOMEN")
        router.push('/drip');
    };

    const handleShopWomen = () => {
        setExclusiveFilter("Women", null);
        setProductType("WOMEN")
        router.push('/drip');
    };

    return (
        <div className='summer-main'>
            <div className="summer-main-container">
                <div className="summer-content">
                    <div className="one"><h2>Summer Sale Promotion</h2></div>
                    <div className="two"><h1>Buy 3 or more items and get 30% off</h1></div>
                    <div className="three"><h2>Free Delivery in UK</h2></div>
                    <div className="four-container">
                        <div className="four">
                            <Image src={supabse_image_path('/dunyatransparent.png')} width={50} height={50} alt='dunya-logo' style={{ opacity: 0.5 }} className='dunya_summer_img' />
                            <p>Ts & Cs Apply</p>
                        </div>
                    </div>
                    {/* <div className="five-container"><div className="five"><h2>Use code: <span>summer30</span></h2></div></div> */}
                </div>

                <div className="summer-side-container">
                    <div className="summer_clock">
                        <div className="clock_container">
                            <div className='clock'>
                                <div className='time_div'>
                                    <h3>Days</h3>
                                    <p>{isClient ? timeLeft.days : "0"}</p>
                                </div>

                                <div className='time_div'>
                                    <h3>Hrs</h3>
                                    <p>{isClient ? timeLeft.hours : "0"}</p>
                                </div>

                                <div className='time_div'>
                                    <h3>Min</h3>
                                    <p>{isClient ? timeLeft.minutes : "0"}</p>
                                </div>

                                <div className='time_div'>
                                    <h3>Sec</h3>
                                    <p>{isClient ? timeLeft.seconds : "0"}</p>
                                </div>
                            </div>

                            <div className='text'>
                                <div className="text-slider" ref={text_slider}>
                                    <p ref={text_one}>Summer Countdown •</p>
                                    <p ref={text_two}>Summer Countdown •</p>
                                </div>
                            </div>
                            {/* 
                            <div className="summer_message">
                                <p>Exclusive Summer Sale</p>
                            </div> */}
                        </div>
                    </div>

                    <div className="summer-side">
                        <h3>Summer sale is here!</h3>
                        <p>30% off for fully priced merchandise</p>
                        <div className="category">
                            <p onClick={handleShopMen}>Shop men</p>
                            <p onClick={handleShopWomen}>Shop women</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
