"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { amex, appay, facebook, globe, gpay, instagram, klarna, localTime, mastercard, paypal, stripe, ukflag, visa, x, youtube } from '../../../public/imports'
import { FlagContext } from '../contexts/flagcontext'
import { useAuth } from '../contexts/auth_context'

export default function Footer() {
  const { location, setShowFlagBox, timezone } = useContext(FlagContext);
  const [time, setTime] = useState("");
  const { shownav } = useAuth();

  useEffect(() => {
    setTime(localTime())
    updateTime()
  }, [time])

  const updateTime = () => {
    const now = new Date();
    const getSeconds = now.getSeconds()
    const secondsDifference = 1000 * (60 - getSeconds)
    setInterval(() => {
      setTime(localTime())
    }, secondsDifference);
  }


  return (
    <>
      {
        !shownav && (
          <div className='footer-main'>
            <div className="footer-container">
              <div className='footer-one'>

                <div className='collection bunch'>
                  <h3>Collection</h3>
                  <div className="div-links">
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

                <div className='auxilliary bunch'>
                  <h3>Auxilliary</h3>
                  <div className="div-links">
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

                <div className='customer bunch'>
                  <h3>Customer</h3>
                  <div className="div-links">
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

                <div className='legal bunch'>
                  <h3>Legal</h3>
                  <div className="div-links">
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
                    <Image src={facebook} width={17} height={17} alt='facebook-svg' />
                    <Image src={instagram} width={17} height={17} alt='facebook-svg' />
                    <Image src={youtube} width={17} height={17} alt='facebook-svg' />
                  </div>
                  <p>© 2025 Dunya-Drip™. All rights reserved. <span>Privacy Policy</span></p>
                </div>

                <div className='subscription'>
                  <h3>Subscribe and Enjoy a 10% Discount On Your First Purchase</h3>
                  <div className="subscribe-form">
                    <form action="">
                      <input
                        type="text"
                        name="name"
                        className="search-input-form"
                        placeholder='Email Address'
                      />
                    </form>
                    <button>Subscribe</button>
                  </div>
                  <div className="disclaimer">
                    <p>By Subscribing You Agree To Our <span>Terms</span> & <span>Privacy Policy</span>.</p>
                  </div>
                </div>

                <div className='language'>
                  <h3>Shipping & Currency</h3>
                  <div className='language-flag' onClick={() => setShowFlagBox(true)}>
                    <Image src={location.flag_image} height={25} width={25} alt='flag' />
                    <p>{`${location.country_name}/${location.currency}`}</p>
                  </div>
                </div>

              </div>

              <div className="footer-three">
                <div className="three-one">
                  <Image src={stripe} height={35} width={35} alt='globe-image' />
                  <Image src={klarna} height={35} width={35} alt='globe-image' />
                  <Image src={paypal} height={35} width={35} alt='globe-image' />
                  <Image src={visa} height={35} width={35} alt='globe-image' />
                  <Image src={mastercard} height={35} width={35} alt='globe-image' />
                  <Image src={gpay} height={35} width={35} alt='globe-image' />
                  <Image src={appay} height={35} width={35} alt='globe-image' />
                  <Image src={amex} height={35} width={35} alt='globe-image' />
                </div>

                <div className="three-two">
                  <div className="timezone">
                    <Image src={globe} height={17} width={17} alt='globe-image' />
                    <p>{timezone}</p>
                  </div>
                  <p>{time}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
