import Image from 'next/image'
import React from 'react'
import { dunya } from '../../../public/imports'

export default function SummerSale() {
    return (
        <div className='summer-main'>
            <div className="summer-main-container">
                <div className="summer-content">
                    <div className="one"><h2>Summer Sale Promotion</h2></div>
                    <div className="two"><h1>Buy 3 or more items and get 30% off</h1></div>
                    <div className="three"><h2>Free Delivery in UK</h2></div>
                    <div className="four-container">
                        <div className="four">
                        <Image src={dunya} width={50} height={50} alt='dunya-logo' style={{opacity: 0.5}} />
                        <p>Ts & Cs Apply</p>
                        </div>
                    </div>
                    <div className="five-container"><div className="five"><h2>Use code: <span>summer30</span></h2></div></div>
                </div>

                <div className="summer-side-container">
                    <div className="summer-side">
                        <h3>Get ready for summer</h3>
                        <p>30% off for fully priced merchandise</p>
                        <div className="category">
                            <p>Shop men</p>
                            <p>Shop women</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
