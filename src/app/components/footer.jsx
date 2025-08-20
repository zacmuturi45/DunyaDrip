"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { flags, localTime } from '../../../public/imports'
import { FlagContext } from '../contexts/flagcontext'
import { useAuth } from '../contexts/auth_context'
import supabse_image_path from '@/utils/supabase/supabse_image_path'
import { useSort } from '../contexts/sort_context'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const { location, setShowFlagBox, timezone } = useContext(FlagContext);
  const [time, setTime] = useState("");
  const { shownav, user } = useAuth();
  const { setExclusiveFilter, setSummerFilter, setProductType } =useSort();
  const router = useRouter();

  useEffect(() => {
    const { time_now } = localTime();
    setTime(time_now)
    updateTime()
  }, [time])

  const updateTime = () => {
    const now = new Date();
    const getSeconds = now.getSeconds()
    const secondsDifference = 1000 * (60 - getSeconds)
    setInterval(() => {
      const { time_now } = localTime();
      setTime(time_now)
    }, secondsDifference);
  }

  const handleClick = (e, dest) => {
    e.preventDefault()

    if (user) {
      router.push(dest)
    } else {
      router.push("/login-out")
    }
  }

  return (
    <>
      {
        !shownav && (
          <div className='footer-main'>
            <div className="footer-container">
              <div className='footer-one'>

                <div className='collection bunch'>
                  <h3>Featured</h3>
                  <div className="div-links">
                    <Link href={"/drip"} className='links' onClick={() => setExclusiveFilter(null, "T-Shirts")}>
                      <p>T-Shirts</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => setExclusiveFilter(null, "Hoodies")}>
                      <p>Hoodies</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => setExclusiveFilter(null, "Sweatpants")}>
                      <p>Sweatpants</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => setExclusiveFilter(null, "Sweaters")}>
                      <p>Sweaters</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => setExclusiveFilter(null, "Varsity Jackets")}>
                      <p>Varsity Jackets</p>
                    </Link>
                  </div>
                </div>

                <div className='auxilliary bunch'>
                  <h3>Collection</h3>
                  <div className="div-links">
                    <Link href={"/drip"} className='links'  onClick={() => {
                      setSummerFilter("Spring", null, null)
                      setProductType("SUMMER COLLECTION")
                    }}>
                      <p>New: Summer Collection</p>
                    </Link>
                    <Link href={"/our_story"} className='links'>
                      <p>Brand</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => {
                      setSummerFilter(null, null, ["Caps", "Bags"])
                      setProductType("ACCESSORIES")
                    }}>
                      <p>Accessories</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => {
                      setSummerFilter(null, "Kids", [])
                      setProductType("KIDS WEAR")
                    }}>
                      <p>Kids Wear</p>
                    </Link>
                    <Link href={"/drip"} className='links' onClick={() => {
                      setSummerFilter(null, "Women", [])
                      setProductType("WOMEN'S WEAR")
                    }}>
                      <p>Women</p>
                    </Link>
                  </div>
                </div>

                <div className='customer bunch'>
                  <h3>Customer</h3>
                  <div className="div-links">
                    <Link href={user ? "/dashboard" : "login-out"} className='links'>
                      <p>My Account</p>
                    </Link>
                    <Link href={"/orders_returns"} className='links'>
                      <p>Orders & Returns</p>
                    </Link>
                    <Link href={"/uk_shipping"} className='links'>
                      <p>UK Shipping</p>
                    </Link>
                    <Link href={"/International_shipping"} className='links'>
                      <p>International Shipping</p>
                    </Link>
                    <Link href={"/Acceptable_Use"} className='links'>
                      <p>Acceptable Use Policy</p>
                    </Link>
                  </div>
                </div>

                <div className='legal bunch'>
                  <h3>Legal</h3>
                  <div className="div-links">
                    <Link href={"/Terms_Conditions"} className='links'>
                      <p>Terms & Conditions</p>
                    </Link>
                    <Link href={"/Accessibility"} className='links'>
                      <p>Accessiblity</p>
                    </Link>
                    <Link href={"/PrivacyPolicy"} className='links'>
                      <p>Privacy Policy</p>
                    </Link>
                    <Link href={"/CookiePolicy"} className='links'>
                      <p>Cookie Policy</p>
                    </Link>
                  </div>
                </div>
              </div>


              <div className='footer-two'>
                <div className='social-media'>
                  <h3>Follow Us</h3>
                  <div className="icons">
                    <Image src={supabse_image_path('/facebook.svg')} width={17} height={17} alt='facebook-svg' />
                    <Image src={supabse_image_path('/instagram.svg')} width={17} height={17} alt='facebook-svg' />
                    <Image src={supabse_image_path('/tiktok_white.svg')} width={17} height={17} alt='facebook-svg' />
                  </div>
                  <p>© 2025 Dunya-Drip™. All rights reserved. <span onClick={() => router.push("/PrivacyPolicy")}>Privacy Policy</span></p>
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
                    <p>By Subscribing You Agree To Our <span onClick={() => router.push("/Terms_Conditions")}>Terms</span> & <span onClick={() => router.push("/PrivacyPolicy")}>Privacy Policy</span>.</p>
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
                  <Image src={supabse_image_path('/stripe.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/klarna.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/paypal.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/visa.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/mastercard.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/gpay.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/appay.svg')} height={35} width={35} alt='globe-image' />
                  <Image src={supabse_image_path('/amex.svg')} height={35} width={35} alt='globe-image' />
                </div>

                <div className="zacdiv">
                  <Image src={flags} width={15} height={15} alt='flag-svg' style={{transform: "rotateY(180deg)"}} />
                  <p>zac.muturi.codes</p>
                  <Image src={flags} width={15} height={15} alt='flag-svg' />

                </div>

                <div className="three-two">
                  <div className="timezone">
                    <Image src={supabse_image_path('/globe.svg')} height={17} width={17} alt='globe-image' />
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
