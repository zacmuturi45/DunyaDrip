"use client"

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

export default function Banner() {
    const slider = useRef(null);
    const first_text = useRef(null);
    const second_text = useRef(null);
    let xPercent = 0;

    useEffect(() => {
        animation()
    }, [])

    const animation = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }
        if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(first_text.current, { xPercent: xPercent })
        gsap.set(second_text.current, { xPercent: xPercent })
        xPercent += -0.05;
        requestAnimationFrame(animation);
    };

    return (
        <div className='drip-banner-main'>
            <div className="banner-slider" ref={slider}>
                <p ref={first_text}>Drip Beyond Borders •</p>
                <p ref={second_text}>Drip Beyond Borders •</p>
            </div>
            <div className="support-p">
                <p>
                    Style knows no boundaries, and neither do we. Dunya Drip is more than fashion—it&apos;s a movement that unites cultures, individuals, and stories through unapologetic self-expression. We celebrate authenticity, breaking down barriers between trends and traditions, between continents and communities. Drip Without Borders is a call to those who dare to stand out, who redefine what it means to belong. Because true style isn&apos;t confined—it&apos;s limitless.
                </p>
            </div>
        </div>
    )
}
