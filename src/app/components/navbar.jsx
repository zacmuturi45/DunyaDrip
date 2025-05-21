"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import '../css/index.css';
import Image from 'next/image';
import { accessories, arrow, bag, dunya, dunyadrip, ethnic, facebook, flag_array, instagram, jacket, kids, kids_accessories, kids_clothing, kids_kicks, men_clothing, men_kicks, nav_fb, nav_insta, newInArray, plus, rep_accessories, rep_clothing, rep_footwear, search, shoe, shoe1, shoe2, shoe3, signin, summer, summer_newin, tiktok, trial, trial1, trial2, ukflag, women_accessories, women_clothing, women_kicks, women_summer, x, youtube } from '../../../public/imports';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UseScroll from './navscroll';
import Cards from './cards';
import { getLocation } from '@/utils/getLocation';
import { FlagContext } from '../contexts/flagcontext';
import FlagBoxes from './flagboxes';
import ScrollingOffers from './scrollingoffers';
import { useCart } from '../contexts/cart_context';
import { useAuth } from '../contexts/auth_context';


export default function Navbar() {
    const [burgerActive, setBurgerActive] = useState(false);
    const scrollDirection = UseScroll();
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState(false);
    const [conditions, setConditions] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showConditions, setShowConditions] = useState(false);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [newin, setNewin] = useState(false);
    const [men, setMen] = useState(false);
    const [rep, setRep] = useState(false);
    const { shownav } = useAuth();
    const [hide_drawer, setHideDrawer] = useState({
        drawer1: false,
        drawer2: false,
        drawer3: false,
        drawer4: false,
        drawer5: false,
        sub_drawer1d1: false,
        sub_drawer1d2: false,
        sub_drawer1d3: false,
        sub_drawer2d1: false,
        sub_drawer2d2: false,
        sub_drawer2d3: false,
        sub_drawer3d1: false,
        sub_drawer3d2: false,
        sub_drawer3d3: false,
        sub_drawer4d1: false,
        sub_drawer4d2: false,
        sub_drawer4d3: false,
    });
    const { cart, setShowCart } = useCart();
    const router = useRouter();
    const hideTimeout = useRef(null);
    const { location, setFlagActive, flag_active, setLocation, apply_location, setColorIndex, showFlagBox, setShowFlagBox } = useContext(FlagContext);
    const searchArray = [
        { product_image: shoe, product_name: "Nike Arreola", price: "65" },
        { product_image: shoe1, product_name: "Nike Blue Blood", price: "55" },
        { product_image: shoe3, product_name: "Nike Creator", price: "35" },
        { product_image: shoe2, product_name: "Nike Kratos", price: "77" },
        { product_image: jacket, product_name: "Nike Darkly", price: "85" }
    ]

    const { user, display_name } = useAuth();


    useEffect(() => {
        if (scrollDirection === "up") {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [scrollDirection])


    const handleMouseEnter = (setSomething, setSomethingElse = null) => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current)
        }
        setSomethingElse ? setSomethingElse(false) : null
        setSomething(true);
    }

    const handleMouseLeave = (setSomething) => {
        hideTimeout.current = setTimeout(() => {
            setSomething(false);
        }, 200);
    };

    const open_drawer = (drawer_name) => {
        setHideDrawer(prevState => ({
            ...prevState,
            [drawer_name]: !prevState[drawer_name]
        }));
    }





    return (
        <>
            {
                !shownav && (
                    <>
                        <div className={visible ? 'nav-main' : 'nav-main hide-nav'}>
                            <div className="nav-container">
                                <div className={burgerActive ? "mobile-nav" : "mobile-nav hide-mobile-nav"}>
                                    <div className="mobile-nav-container">

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>NEW IN</p>
                                                <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("drawer1")} className={hide_drawer.drawer1 ? "rotate" : ""} />
                                            </div>
                                            <div className={hide_drawer.drawer1 ? "one-drawer" : "hide-drawer"}>
                                                <p>Men&apos;s New In</p>
                                                <p>Women&apos;s New In</p>
                                                <p>Kid&apos;s New In</p>
                                            </div>
                                        </div>

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>MEN</p>
                                                <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("drawer2")} className={hide_drawer.drawer2 ? "rotate" : ""} />
                                            </div>
                                            <div className={hide_drawer.drawer2 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Clothing</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer1d1")} style={hide_drawer.sub_drawer1d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer1d1 ? "p-drawer" : "hide-drawer"}>
                                                        <p>T-shirts</p>
                                                        <p>Denim</p>
                                                        <p>Shorts</p>
                                                        <p>Chinos</p>
                                                        <p>Pants</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Kicks</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer1d2")} style={hide_drawer.sub_drawer1d2 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer1d2 ? "p-drawer" : "hide-drawer"}>
                                                        <p>T-shirts</p>
                                                        <p>Denim</p>
                                                        <p>Shorts</p>
                                                        <p>Chinos</p>
                                                        <p>Pants</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Accessories</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer1d3")} style={hide_drawer.sub_drawer1d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer1d3 ? "p-drawer" : "hide-drawer"}>
                                                        <p>T-shirts</p>
                                                        <p>Denim</p>
                                                        <p>Shorts</p>
                                                        <p>Chinos</p>
                                                        <p>Pants</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* WOMEN-MOBILE-NAV */}

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>WOMEN</p>
                                                <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("drawer3")} className={hide_drawer.drawer3 ? "rotate" : ""} />
                                            </div>
                                            <div className={hide_drawer.drawer3 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Clothing</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer2d1")} style={hide_drawer.sub_drawer2d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer2d1 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Dresses</p>
                                                        <p>Blouses</p>
                                                        <p>Leggings</p>
                                                        <p>Skirts</p>
                                                        <p>Jackets</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Shoes</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer2d2")} style={hide_drawer.sub_drawer2d2 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer2d2 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Heels</p>
                                                        <p>Flats</p>
                                                        <p>Sneakers</p>
                                                        <p>Boots</p>
                                                        <p>Sandals</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Accessories</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer2d3")} style={hide_drawer.sub_drawer2d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer2d3 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Handbags</p>
                                                        <p>Scarves</p>
                                                        <p>Jewelry</p>
                                                        <p>Watches</p>
                                                        <p>Gloves</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* WOMEN-MOBILE-NAV */}


                                        {/* KIDS-MOBILE-NAV */}

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>KIDS</p>
                                                <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("drawer4")} className={hide_drawer.drawer4 ? "rotate" : ""} />
                                            </div>
                                            <div className={hide_drawer.drawer4 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Clothing</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer3d1")} style={hide_drawer.sub_drawer3d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer3d1 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Shirts</p>
                                                        <p>Jackets</p>
                                                        <p>Jeans</p>
                                                        <p>Shorts</p>
                                                        <p>Pajamas</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Shoes</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer3d2")} style={hide_drawer.sub_drawer3d2 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer3d2 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Boots</p>
                                                        <p>Sneakers</p>
                                                        <p>Sandals</p>
                                                        <p>Slip-ons</p>
                                                        <p>School Shoes</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Accessories</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer3d3")} style={hide_drawer.sub_drawer3d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer3d3 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Hats</p>
                                                        <p>Belts</p>
                                                        <p>Gloves</p>
                                                        <p>Socks</p>
                                                        <p>Backpacks</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* KIDS-MOBILE-NAV */}

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>GIFT</p>
                                                {/* <Image src={plus} width={15} height={15} alt='plus' /> */}
                                            </div>
                                            <div className="mobile-nav-links-detail"></div>
                                        </div>

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>EYEWEAR</p>
                                                {/* <Image src={plus} width={15} height={15} alt='plus' /> */}
                                            </div>
                                            <div className="mobile-nav-links-detail"></div>
                                        </div>
                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>BRAND</p>
                                                {/* <Image src={plus} width={15} height={15} alt='plus' /> */}
                                            </div>
                                            <div className="mobile-nav-links-detail"></div>
                                        </div>


                                        {/* REP-YOUR-COUNTRY */}

                                        <div className="mobile-nav-links">
                                            <div className="mobile-nav-links-title">
                                                <p>REP YOUR COUNTRY</p>
                                                <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("drawer5")} className={hide_drawer.drawer5 ? "rotate" : ""} />
                                            </div>
                                            <div className={hide_drawer.drawer5 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                                <div>
                                                    <div className="two-drawer">
                                                        <p>National Wear</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer4d1")} style={hide_drawer.sub_drawer4d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer4d1 ? "p-drawer" : "hide-drawer"}>
                                                        <p>African Prints</p>
                                                        <p>Kimono</p>
                                                        <p>Sarong</p>
                                                        <p>Dirndl</p>
                                                        <p>Sari</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Sports Jerseys</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer4d2")} style={hide_drawer.sub_drawer4d2 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer4d2 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Soccer</p>
                                                        <p>Basketball</p>
                                                        <p>Baseball</p>
                                                        <p>Cricket</p>
                                                        <p>Rugby</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="two-drawer">
                                                        <p>Flags & Accessories</p>
                                                        <Image src={plus} width={15} height={15} alt='plus' onClick={() => open_drawer("sub_drawer4d3")} style={hide_drawer.sub_drawer4d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                                    </div>
                                                    <div className={hide_drawer.sub_drawer4d3 ? "p-drawer" : "hide-drawer"}>
                                                        <p>Flag T-shirts</p>
                                                        <p>Scarves</p>
                                                        <p>Caps</p>
                                                        <p>Wristbands</p>
                                                        <p>Face Paint</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* REP-YOUR-COUNTRY */}

                                        <div className="nav-footer">
                                            <div>{
                                                user ? <p onClick={() => router.push("/dashboard")}>{`Welcome ${display_name}`}</p> : <p onClick={() => {
                                                    router.push("/login-out")
                                                    setBurgerActive(!burgerActive)
                                                }}>Login</p>
                                            }</div>
                                            <div className="nav-footer-flag" onClick={() => setShowFlagBox(true)}>
                                                <Image src={location.flag_image} height={25} width={25} alt='flag' />
                                                <p>{`${location.country_name}/${location.currency}`}</p>
                                            </div>

                                            <div className="nav-footer-contact">
                                                <h3>Contact Us</h3>
                                                <p>+447492804388</p>
                                                <p>customercare@dunyadrip.co.uk</p>
                                            </div>
                                            <div className="nav-footer-socials">
                                                <Image src={nav_fb} width={20} height={20} alt='facebook' />
                                                <Image src={nav_insta} width={20} height={20} alt='facebook' />
                                                <Image src={tiktok} width={20} height={20} alt='facebook' />
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                {
                                    showSearchPanel && (
                                        <div className="search-panel">
                                            <div className="x" onClick={() => setShowSearchPanel(false)}><Image src={x} width={25} height={25} alt='x-button' /></div>

                                            <div className="searchbar">
                                                <form action="">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="search-input-form"
                                                        placeholder='SEARCH DUNYA DRIP'
                                                    />
                                                </form>
                                            </div>

                                            <div className="search-results-container">
                                                <p>SEARCH RESULTS</p>
                                                <div className="cards-container">
                                                    {
                                                        searchArray.map((item, index) => (
                                                            <Cards image={item.product_image} product_name={item.product_name} price={item.price} key={`nav_card${index}`} index={index} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className={showFlagBox ? "flag-box" : "hide-flag-box flag-box"}>
                                    <div className="flag-box-container">
                                        <div className="flag-box-one">
                                            <Image src={x} height={20} width={20} alt='x-button' className='flag-x' onClick={() => setShowFlagBox(false)} />
                                            <h4 style={{ fontSize: ".7rem" }}>CURRENT LOCATION</h4>
                                            <FlagBoxes image={location.flag_image} country={location.country_name} currency={location.currency} />
                                            <p className='shipping-text'>{`You are currently shipping to ${location.country_name} and your order will be billed in (${location.currency})`}</p>
                                        </div>

                                        <div className="flag-box-two">
                                            <p className="all-countries-title">All Countries & Regions</p>
                                            <div className="all-countries-flags">
                                                {
                                                    flag_array.map((item, index) => (
                                                        <div key={index}>
                                                            <FlagBoxes index={index} image={item.flag_image} country={item.country_name} currency={item.currency} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="flag-box-three">
                                            <button className={flag_active ? "apply apply-full" : "apply"} onClick={() => {
                                                setFlagActive(false)
                                                setColorIndex(3000)
                                                setLocation(apply_location)
                                            }}>Apply</button>
                                        </div>
                                    </div>
                                </div>


                                <div className="banner">
                                    <ScrollingOffers />
                                </div>

                                <div className="main-nav-content" id='main-nav'>

                                    <div className={newin ? "newin" : "hide-newin"} onMouseEnter={() => handleMouseEnter(setNewin)} onMouseLeave={() => handleMouseLeave(setNewin)} >
                                        <div className="newin-filter" onMouseEnter={() => handleMouseLeave(setNewin)}></div>
                                        <div className="newin-container">
                                            <div className="newin-detail">
                                                <h4 onClick={() => router.push("/drip")}>NEW IN</h4>
                                                {
                                                    newInArray.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className="summer-collection">
                                                <div className="summer-card">
                                                    <Image src={summer_newin} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                    <div className="summer-card-detail">
                                                        <h4>Exclusive: Summer Collection 2025</h4>
                                                        <p>Shop Now</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={men ? "men" : "hide-men"} onMouseEnter={() => handleMouseEnter(setMen)} onMouseLeave={() => handleMouseLeave(setMen)} >
                                        <div className="men-filter" onMouseEnter={() => handleMouseLeave(setMen)}></div>
                                        <div className="men-container">

                                            <div className='men-clothing'>
                                                <h4>Clothing</h4>
                                                {
                                                    men_clothing.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='men-clothing'>
                                                <h4>Kicks</h4>
                                                {
                                                    men_kicks.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='men-clothing'>
                                                <h4>Accessories</h4>
                                                {
                                                    accessories.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className="summer-collection">
                                                <div className="summer-card">
                                                    <Image src={summer} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                    <div className="summer-card-detail">
                                                        <h4>Exclusive: Summer Collection 2025</h4>
                                                        <p>Shop Now</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className={rep ? "rep" : "hide-rep"} onMouseEnter={() => handleMouseEnter(setRep)} onMouseLeave={() => handleMouseLeave(setRep)} >
                                        <div className="rep-filter" onMouseEnter={() => handleMouseLeave(setRep)}></div>
                                        <div className="rep-container">

                                            <div className='rep-clothing'>
                                                <h4>Clothing</h4>
                                                {
                                                    rep_clothing.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='rep-clothing'>
                                                <h4>Kicks</h4>
                                                {
                                                    rep_footwear.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='rep-clothing'>
                                                <h4>Accessories</h4>
                                                {
                                                    rep_accessories.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className="summer-collection">
                                                <div className="summer-card">
                                                    <Image src={ethnic} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                    <div className="summer-card-detail">
                                                        <h4>Exclusive: Summer Collection 2025</h4>
                                                        <p>Shop Now</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className={categories ? "kids" : "hide-kids"} id='catdiv' onMouseEnter={() => handleMouseEnter(setCategories)} onMouseLeave={() => handleMouseLeave(setCategories)}>
                                        <div className="kids-filter" onMouseEnter={() => handleMouseLeave(setCategories)}></div>

                                        <div className="kids-container">

                                            <div className='kids-clothing'>
                                                <h4>Clothing</h4>
                                                {
                                                    kids_clothing.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='kids-clothing'>
                                                <h4>Kicks</h4>
                                                {
                                                    kids_kicks.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='kids-clothing'>
                                                <h4>Accessories</h4>
                                                {
                                                    kids_accessories.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className="summer-collection">
                                                <div className="summer-card">
                                                    <Image src={kids} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                    <div className="summer-card-detail">
                                                        <h4>Exclusive: Summer Collection 2025</h4>
                                                        <p>Shop Now</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className={conditions ? "women" : "hide-women"} id='catdiv' onMouseEnter={() => handleMouseEnter(setConditions)} onMouseLeave={() => handleMouseLeave(setConditions)}>
                                        <div className="women-filter" onMouseEnter={() => handleMouseLeave(setConditions)}></div>

                                        <div className="women-container">

                                            <div className='women-clothing'>
                                                <h4>Clothing</h4>
                                                {
                                                    women_clothing.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='women-clothing'>
                                                <h4>Kicks</h4>
                                                {
                                                    women_kicks.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='women-clothing'>
                                                <h4>Accessories</h4>
                                                {
                                                    women_accessories.map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className="summer-collection">
                                                <div className="summer-card">
                                                    <Image src={women_summer} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                    <div className="summer-card-detail">
                                                        <h4>Exclusive: Summer Collection 2025</h4>
                                                        <p>Shop Now</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="nav-tier2">

                                        <div className="hamburger-container" onClick={() => setBurgerActive(!burgerActive)} style={{ marginRight: ".5rem" }}>
                                            <div className={burgerActive ? "hamburger-menu burger-active" : "hamburger-menu"} ></div>
                                        </div>

                                        <div className='nav-tier2-one' onClick={() => setShowFlagBox(true)}>
                                            <Image src={location.flag_image} height={25} width={25} alt='flag' />
                                            <p>{`${location.country_name}/${location.currency}`}</p>
                                        </div>

                                        <div className='nav-tier2-two'>
                                            <Image src={dunyadrip} height={50} width={50} alt='dunya-drip-logo' unoptimized className='trial' onClick={() => router.push("/")} />
                                            <Image src={dunya} height={50} width={50} alt='dunya-drip-logo' unoptimized className='trial1' onClick={() => router.push("/")} style={{ cursor: "pointer" }} />
                                        </div>

                                        <div className='nav-tier2-three'>
                                            <div className='nav-tier2-login'>
                                                {
                                                    user ? <Image src={signin} width={25} height={25} alt='signin' onClick={() => router.push("/dashboard")} /> : <p onClick={() => router.push("/login-out")}>Login</p>
                                                }
                                            </div>
                                            <div className='nav-tier2-search'><Image src={search} height={25} width={25} alt='search-svg' onClick={() => setShowSearchPanel(true)} /></div>
                                            <div className='nav-tier2-bag' onClick={() => setShowCart(true)} ><Image src={bag} height={20} width={20} alt='search-svg' />{cart.length !== 0 && <div className='bag-items'>{cart.length}</div>}</div>
                                        </div>

                                    </div>
                                    {/* End of Nav Tier 2 */}

                                    <div className='nav-links'>
                                        <Link href="/" className='links' id='categories' onMouseEnter={() => {
                                            handleMouseEnter(setNewin, setMen)
                                            setMen(false)
                                        }} onMouseLeave={() => handleMouseLeave(setNewin)}>
                                            <p>NEW IN</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/shop" className='links' onMouseEnter={() => {
                                            handleMouseEnter(setMen, setNewin)
                                            setConditions(false)
                                        }} onMouseLeave={() => handleMouseLeave(setMen)}>
                                            <p>MEN</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/interior" className='links' id='wellsol' onMouseEnter={() => {
                                            handleMouseEnter(setConditions, setMen)
                                            setCategories(false)
                                        }} onMouseLeave={() => handleMouseLeave(setConditions)}>
                                            <p>WOMEN</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/shop" className='links' onMouseEnter={() => handleMouseEnter(setCategories, setConditions)} onMouseLeave={() => handleMouseLeave(setCategories)}>
                                            <p>KIDS</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/blog" className='links' id='blogdiv'>
                                            <p>GIFT</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/blog" className='links' id='blogdiv'>
                                            <p>EYEWEAR</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/blog" className='links' id='blogdiv'>
                                            <p>BRAND</p>
                                            <div className="indicator"></div>
                                        </Link>
                                        <Link href="/blog" className='links' id='blogdiv' onMouseEnter={() => handleMouseEnter(setRep, setNewin)} onMouseLeave={() => handleMouseLeave(setRep)}>
                                            <p>REP YOUR COUNTRY</p>
                                            <div className="indicator"></div>
                                        </Link>
                                    </div>

                                    {/* <div className='nav-cart-div'>
                        <div className="cart-div">
                            <button>
                                (+254) 706534206
                            </button>
                            <button id='nav-button2'>
                                Book Session
                            </button>
                        </div>
                    </div> */}


                                    <div className='mobile-cart-div'>
                                        <div className="cart-div">
                                            <button id='nav-button2' style={{ backgroundColor: "white", color: "black", transform: "scale(0.85)" }}>
                                                Book Session
                                            </button>
                                        </div>
                                    </div>


                                </div>


                            </div>



                            <div className={burgerActive ? "filter-div" : "filter-div invisible"}>
                                <div className='filter-div-menu'>

                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
