"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { facebook, instagram, x } from '../../../public/imports'
import { FlagContext } from '../contexts/flagcontext'

export default function Footer() {
    const { location, setShowFlagBox } = useContext(FlagContext);

    return (
        <div className='footer-main'>
            <div className="footer-container">
                <div className='footer-one'>

                    <div className='collection'>
                        <h3>Collection</h3>
                        <div className="collection-links">
                            <Link href={"/"} className='links'>
                                <p>New: Summer Collection</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Bestsellers</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Accessories</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Kids Wear</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Dunya Collection</p>
                            </Link>
                        </div>
                    </div>

                    <div className='customer'>
                        <h3>Collection</h3>
                        <div className="customer-links">
                            <Link href={"/"} className='links'>
                                <p>My Account</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Contact Us</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Orders & Returns</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>UK Shipping</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>International Shipping</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>EU VAT</p>
                            </Link>
                        </div>
                    </div>

                    <div className='legal'>
                        <h3>Legal</h3>
                        <div className="legal-links">
                            <Link href={"/"} className='links'>
                                <p>Terms & Conditions</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Accessiblity</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Privacy Policy</p>
                            </Link>
                            <Link href={"/"} className='links'>
                                <p>Cookie Policy</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='footer-two'>
                    <div className='social-media'>
                        <h3>Follow Us</h3>
                        <div className="icons">
                            <Image src={facebook} width={25} height={25} alt='facebook-svg' />
                            <Image src={instagram} width={25} height={25} alt='facebook-svg' />
                            <Image src={x} width={25} height={25} alt='facebook-svg' />
                        </div>
                    </div>

                    <div className='subscription'>
                        <h3>Subscribe and Enjoy a 10% Discount On Your First Purchase</h3>
                        <div className="subscribe-form">
                            <form action="">
                                <input
                                    type="text"
                                    name="name"
                                    className="search-input-form"
                                    placeholder=''
                                />
                            </form>
                        </div>
                        <div className="disclaimer">
                            <p>By Subscribing You Agree To Our Terms & Conditions.</p>
                        </div>
                    </div>

                    <div className='language'>
                        <h3>Region & Currency</h3>
                        <div className='language-flag' onClick={() => setShowFlagBox(true)}>
                            <Image src={location.flag_image} height={25} width={25} alt='flag' />
                            <p>{`${location.country_name}/${location.currency}`}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
