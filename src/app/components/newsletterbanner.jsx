import Image from 'next/image'
import React from 'react'
import { carl_main, hero1, hero3, hero4, hero5, x } from '../../../public/imports'

export default function NewsLetter({ setShowBanner }) {
    return (
        <div className='newsletter-main'>
            <div className="newsletter-container">
                <div className='image-div'>
                    <Image src={hero5} width={100} height={100} unoptimized alt='newsletter-main' className='news-image' />
                </div>
                <div className='newsletter-text'>
                    <Image src={x} width={20} height={20} alt='x-svg' className='x-svg' onClick={() => setShowBanner(false)} />
                    <h2>Newsletter Signup</h2>
                    <p>Sign up for exclusive offers, promotions, new arrivals, collaborations and much more - straight to your inbox.</p>
                    <div className="input-box">
                        <form action="">
                            <input
                                type="text"
                                name="name"
                                className="search-input-form"
                                placeholder='Your email'
                            />
                        </form>

                        <div className="region">
                            <p>Country / Region</p>
                            <p>United Kingdom</p>
                        </div>
                        <p className="join-info">
                            Join the Dunya Drip movement and get 10% off your first order. Sign up for promotions, exclusive new arrivals, collaborations and much more - straight to your inbox. By subscribing to our newsletter, you confirm to have read the <span>Privacy Policy</span> and you allow consent to the processing of your personal data for marketing purposes.
                        </p>
                        <button>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
