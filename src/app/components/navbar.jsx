"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import '../css/index.css';
import Image from 'next/image';
import { flag_array, kids_accessories, kids_clothing, men_accessories, men_clothing, men_kicks, newInArray, rep_accessories, rep_clothing, search_head, women_accessories, women_clothing } from '../../../public/imports';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UseScroll from './navscroll';
import Cards from './cards';
import { FlagContext } from '../contexts/flagcontext';
import FlagBoxes from './flagboxes';
import ScrollingOffers from './scrollingoffers';
import { useCart } from '../contexts/cart_context';
import { useAuth } from '../contexts/auth_context';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import { useSort } from '../contexts/sort_context';
import { AnimatePresence, motion } from 'framer-motion';


export default function Navbar() {
    const [burgerActive, setBurgerActive] = useState(false);
    const scrollDirection = UseScroll();
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState(false);
    const [conditions, setConditions] = useState(false);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [newin, setNewin] = useState(false);
    const [men, setMen] = useState(false);
    const [rep, setRep] = useState(false);
    const signin = supabse_image_path('/signin.svg');
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
    const { cart, setShowCart, setRegion } = useCart();
    const router = useRouter();
    const hideTimeout = useRef(null);
    const { location, setFlagActive, flag_active, setLocation, apply_location, setColorIndex, showFlagBox, setShowFlagBox, is_nav } = useContext(FlagContext);

    const { user, display_name } = useAuth();
    const { setProductType, handleFilterChange, setExclusiveFilter } = useSort();
    const { setShippingOption, product } = useCart();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchDelay = useRef(null);
    const [carouselPosition, setCarouselPosition] = useState(0);
    const CAROUSEL_VISIBLE_COUNT = 4;

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.45,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.1,
                ease: "easeIn"
            }
        }
    };

    // ...rest of your state and hooks...

    // Search handler
    useEffect(() => {
        // Only search if search panel is open and query is not empty
        if (!showSearchPanel || searchQuery.trim() === "") {
            setSearchResults([]);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);
        // Debounce the search to avoid running it on every keystroke
        if (searchDelay.current) clearTimeout(searchDelay.current);
        searchDelay.current = setTimeout(() => {
            // Fake async for loader effect (replace with actual async if needed)
            const query = searchQuery.trim().toLowerCase();
            // You can customize which fields to search (name, type, color, etc)
            const results = product.filter(item =>
                (item.name && item.name.toLowerCase().includes(query)) ||
                (item.product_type && item.product_type.toLowerCase().includes(query)) ||
                (item.color && item.color.some(c => c.toLowerCase().includes(query))) ||
                (item.category && item.category.toLowerCase().includes(query))
            );
            setSearchResults(results);
            setSearchLoading(false);
        }, 400); // 400ms debounce

        return () => clearTimeout(searchDelay.current);
    }, [searchQuery, product, showSearchPanel]);

    const handleLeft = () => {
        setCarouselPosition((prev) => Math.max(prev - 1, 0));
    };

    const handleRight = () => {
        setCarouselPosition((prev) =>
            Math.min(prev + 1, Math.max(0, searchResults.length - CAROUSEL_VISIBLE_COUNT))
        );
    };

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

    const handleClick = (item = null, category) => {
        setExclusiveFilter(category, item);
        router.push("/drip");
    };

    useEffect(() => {
        if (showFlagBox) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
        // Cleanup in case the component unmounts while panel is open
        return () => {
            document.body.style.overflow = '';
        }
    }, [showFlagBox]);

    useEffect(() => {
        if (showSearchPanel) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
        // Cleanup in case the component unmounts while panel is open
        return () => {
            document.body.style.overflow = '';
        }
    }, [showSearchPanel]);

    useEffect(() => {
        if (burgerActive) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
        // Cleanup in case the component unmounts while panel is open
        return () => {
            document.body.style.overflow = '';
        }
    }, [burgerActive]);





    return (
        <>
            {/* <div className={visible ? 'nav-main' : 'nav-main hide-nav'}> */}
            <div className={is_nav ? "hide-nav nav-main" : "nav-main"}>
                <div className="nav-container">
                    <div className={burgerActive ? "mobile-nav" : "mobile-nav hide-mobile-nav"}>
                        <div className="mobile-nav-container">

                            <div className="mobile-nav-links">
                                <div
                                    onClick={() => open_drawer("drawer1")}
                                    className="mobile-nav-links-title">
                                    <p>NEW IN</p>
                                    <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' className={hide_drawer.drawer1 ? "rotate" : ""} />
                                </div>
                                <div className={hide_drawer.drawer1 ? "one-drawer" : "hide-drawer"}>
                                    <p
                                        onClick={() => {
                                            handleClick('Hoodies', "NEW IN")
                                            setBurgerActive(false)
                                            open_drawer("drawer1")
                                        }}
                                    >Hoodies</p>
                                    <p
                                        onClick={() => {
                                            handleClick('Sweatpants', "NEW IN")
                                            setBurgerActive(false)
                                            open_drawer("drawer1")
                                        }}
                                    >Sweatpants</p>
                                    <p
                                        onClick={() => {
                                            handleClick('T-Shirts', "NEW IN")
                                            setBurgerActive(false)
                                            open_drawer("drawer1")
                                        }}
                                    >T-Shirts</p>
                                </div>
                            </div>

                            <div className="mobile-nav-links">
                                <div
                                    onClick={() => open_drawer("drawer2")}
                                    className="mobile-nav-links-title">
                                    <p>MEN</p>
                                    <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' className={hide_drawer.drawer2 ? "rotate" : ""} />
                                </div>
                                <div className={hide_drawer.drawer2 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer1d1")}
                                            className="two-drawer">
                                            <p>Clothing</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer1d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer1d1 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                men_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Men")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer1d1")
                                                        open_drawer("drawer2")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer1d3")}
                                            className="two-drawer">
                                            <p>Accessories</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer1d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer1d3 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                men_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "ACCESSORIES")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer1d3")
                                                        open_drawer("drawer2")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* WOMEN-MOBILE-NAV */}

                            <div className="mobile-nav-links">
                                <div
                                    onClick={() => open_drawer("drawer3")}
                                    className="mobile-nav-links-title">
                                    <p>WOMEN</p>
                                    <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' className={hide_drawer.drawer3 ? "rotate" : ""} />
                                </div>
                                <div className={hide_drawer.drawer3 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer2d1")}
                                            className="two-drawer">
                                            <p>Clothing</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer2d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer2d1 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                women_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Women")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer2d1")
                                                        open_drawer("drawer3")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer2d2")}
                                            className="two-drawer">
                                            <p>Accessories</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer2d2 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer2d2 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                women_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Women")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer2d2")
                                                        open_drawer("drawer3")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* WOMEN-MOBILE-NAV */}


                            {/* KIDS-MOBILE-NAV */}

                            <div className="mobile-nav-links">
                                <div
                                    onClick={() => open_drawer("drawer4")}
                                    className="mobile-nav-links-title">
                                    <p>KIDS</p>
                                    <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' className={hide_drawer.drawer4 ? "rotate" : ""} />
                                </div>
                                <div className={hide_drawer.drawer4 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer3d1")}
                                            className="two-drawer">
                                            <p>Clothing</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer3d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer3d1 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                kids_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "KID'S CLOTHING")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer3d1")
                                                        open_drawer("drawer4")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer3d3")}
                                            className="two-drawer">
                                            <p>Accessories</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer3d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer3d3 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                kids_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "KID'S CLOTHING")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer3d3")
                                                        open_drawer("drawer4")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* KIDS-MOBILE-NAV */}

                            <div className="mobile-nav-links">
                                <Link href="/drip" onClick={() => {
                                    setExclusiveFilter(null, "Bags")
                                    setProductType("Bags")
                                    setBurgerActive(false)
                                }} className="mobile-nav-links-title next-link">
                                    <p>BAGS</p>
                                    <div className="indicator"></div>
                                </Link>

                                <div className="mobile-nav-links-detail"></div>
                            </div>


                            <div className="mobile-nav-links">
                                <div className="mobile-nav-links-title">
                                    <Link href="/our_story" onClick={() => setBurgerActive(false)} className="mobile-nav-links-title next-link">
                                        <p>BRAND</p>
                                    </Link>
                                </div>
                            </div>


                            {/* REP-YOUR-COUNTRY */}

                            <div className="mobile-nav-links">
                                <div
                                    onClick={() => open_drawer("drawer5")}
                                    className="mobile-nav-links-title">
                                    <p>REP YOUR COUNTRY</p>
                                    <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' className={hide_drawer.drawer5 ? "rotate" : ""} />
                                </div>
                                <div className={hide_drawer.drawer5 ? "mobile-nav-links-detail" : "hide-drawer"}>
                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer4d1")}
                                            className="two-drawer">
                                            <p>National Wear</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer4d1 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer4d1 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                rep_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "CLOTHING")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer4d1")
                                                        open_drawer("drawer5")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>


                                    <div>
                                        <div
                                            onClick={() => open_drawer("sub_drawer4d3")}
                                            className="two-drawer">
                                            <p>Flags & Accessories</p>
                                            <Image src={supabse_image_path('/plus.svg')} width={15} height={15} alt='plus' style={hide_drawer.sub_drawer4d3 ? { transform: "rotate(45deg)" } : { transform: "rotate(0deg)" }} />
                                        </div>
                                        <div className={hide_drawer.sub_drawer4d3 ? "p-drawer" : "hide-drawer"}>
                                            {
                                                rep_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "ACCESSORIES")
                                                        setBurgerActive(false)
                                                        open_drawer("sub_drawer4d3")
                                                        open_drawer("drawer5")
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* REP-YOUR-COUNTRY */}

                            <div className="nav-footer">
                                <div>{
                                    user ? <Link className='next-link' href={"/dashboard"}><p>{`Welcome ${display_name}`}</p></Link> : <Link className='next-link' href={"/login-out"} onClick={() => setBurgerActive(!burgerActive)}><p>Login</p></Link>
                                }</div>
                                <div className="nav-footer-flag" onClick={() => setShowFlagBox(true)}>
                                    <Image src={location.flag_image} height={20} width={30} alt='flag' style={{ borderRadius: "3px", overflow: "hidden" }} />
                                    <p>{`${location.country_name}/${location.currency}`}</p>
                                </div>

                                <div className="nav-footer-contact">
                                    <h3>Contact Us</h3>
                                    <p>+447492804388</p>
                                    <p>customercare@dunyadrip.co.uk</p>
                                </div>
                                <div className="nav-footer-socials">
                                    <Image src={supabse_image_path('/nav_fb.svg')} width={20} height={20} alt='facebook' />
                                    <Image src={supabse_image_path('/nav_insta.svg')} width={20} height={20} alt='facebook' />
                                    <Image src={supabse_image_path('/tiktok.svg')} width={20} height={20} alt='facebook' />
                                </div>
                            </div>


                        </div>

                    </div>

                    {/* END OF MOBILE NAV SECTION */}
                    {showSearchPanel && (
                        <div className="search-panel">
                            <div className="x" onClick={() => setShowSearchPanel(false)}>
                                <Image src={supabse_image_path('/x.svg')} width={25} height={25} alt='x-button' />
                            </div>

                            <div className="searchbar">
                                <form action="" onSubmit={e => e.preventDefault()}>
                                    <input
                                        type="text"
                                        name="name"
                                        className="search-input-form"
                                        placeholder='SEARCH DUNYA DRIP'
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                </form>
                            </div>

                            <div className="search-results-container">
                                <p>SEARCH RESULTS</p>
                                <div className="cards-container">
                                    {searchLoading ? (
                                        <div className="search-loader" style={{ textAlign: "center", width: "100%" }}>
                                            {/* Replace below with your <Loader /> or <Spinner /> if you have */}
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        searchQuery.trim() === "" ? (
                                            <div className="search-placeholder" style={{ textAlign: "center", width: "100%" }}>
                                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                                                    <Image src={search_head} width={100} height={100} alt='search-head' />
                                                    <span>Type to search for products...</span>
                                                </div>
                                            </div>
                                        ) : searchResults.length === 0 ? (
                                            <div className="search-no-results" style={{ textAlign: "center", width: "100%" }}>
                                                <span>No results found.</span>
                                            </div>
                                        ) : (
                                            <div className="carousel-wrapper">
                                                {searchResults.length > CAROUSEL_VISIBLE_COUNT && (
                                                    <button className="carousel-arrow left" onClick={handleLeft} disabled={carouselPosition === 0}>
                                                        &#8592;
                                                    </button>
                                                )}
                                                <div className="carousel-viewport">
                                                    <div
                                                        className="carousel-inner"
                                                        style={{
                                                            transform: `translateX(-${carouselPosition * 25}%)`,
                                                            transition: 'transform 0.3s',
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        {searchResults.map((item, index) => (
                                                            <div
                                                                className="carousel-item"
                                                                style={{ flex: `0 0 ${100 / CAROUSEL_VISIBLE_COUNT}%`, boxSizing: 'border-box' }}
                                                                key={`nav_card${index}`}
                                                                onClick={() => {
                                                                    setSearchQuery("")
                                                                    setShowSearchPanel(false)
                                                                }}
                                                            >
                                                                <Link href={`/${item.id}`} className='next-link'>
                                                                    <Cards
                                                                        image={item.image_url}
                                                                        product_name={item.name}
                                                                        price={item.price}
                                                                        index={index}
                                                                        id={item.id}
                                                                    />
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {searchResults.length > CAROUSEL_VISIBLE_COUNT && (
                                                    <button
                                                        className="carousel-arrow right"
                                                        onClick={handleRight}
                                                        disabled={carouselPosition >= searchResults.length - CAROUSEL_VISIBLE_COUNT}
                                                    >
                                                        &#8594;
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={showFlagBox ? "flag-box" : "hide-flag-box flag-box"}>
                        <div className="flag-box-container">
                            <div className="flag-box-one">
                                <Image src={supabse_image_path('/x.svg')} height={20} width={20} alt='x-button' className='flag-x' onClick={() => setShowFlagBox(false)} />
                                <h4 style={{ fontSize: ".7rem" }}>CURRENT LOCATION</h4>
                                <FlagBoxes image={location.flag_image} country={location.country_name} currency={location.currency} />
                                <p className='shipping-text'>{`You are currently shipping to ${location.country_name}.`}</p>
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
                                    setRegion(apply_location.country_name)
                                }}>Apply</button>
                            </div>
                        </div>
                    </div>


                    <div className="banner">
                        <ScrollingOffers />
                    </div>

                    {/* MAIN NAV SECTION */}

                    <div className="main-nav-content" id='main-nav'>

                        {/* NEW IN DROPDOWN WITH FRAMER MOTION */}
                        <AnimatePresence>
                            {newin && (
                                <motion.div
                                    className="newin"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => handleMouseEnter(setNewin)}
                                    onMouseLeave={() => handleMouseLeave(setNewin)}
                                >
                                    <div className="newin-filter" onMouseEnter={() => handleMouseLeave(setNewin)}></div>
                                    <div className="newin-container">
                                        <div className="newin-detail">
                                            <h4>NEW IN</h4>
                                            {
                                                newInArray.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "NEW IN")
                                                        handleMouseLeave(setNewin)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="summer-collection">
                                            <div className="summer-card">
                                                <Image src={supabse_image_path('/newin.webp')} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                <div className="summer-card-detail">
                                                    <h4>Exclusive: Summer Collection 2025</h4>
                                                    <p onClick={() => {
                                                        handleFilterChange("Season", "Summer")
                                                        setProductType("SUMMER COLLECTION")
                                                        handleMouseLeave(setNewin)
                                                        router.push("/drip")
                                                    }}>Shop Now</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MEN DROPDOWN WITH FRAMER MOTION */}

                        {/* FILTER IS USED HERE */}

                        <AnimatePresence>
                            {men && (
                                <motion.div
                                    className="men"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => handleMouseEnter(setMen)}
                                    onMouseLeave={() => handleMouseLeave(setMen)}
                                >
                                    <div className="men-filter" onMouseEnter={() => handleMouseLeave(setMen)}></div>
                                    <div className="men-container">

                                        <div className='men-clothing'>
                                            <h4>Clothing</h4>
                                            {
                                                men_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Men")
                                                        handleMouseLeave(setMen)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className='men-clothing'>
                                            <h4>Accessories</h4>
                                            {
                                                men_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "ACCESSORIES")
                                                        handleMouseLeave(setMen)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className="summer-collection">
                                            <div className="summer-card">
                                                <Image src={supabse_image_path('/summer.webp')} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                <div className="summer-card-detail">
                                                    <h4>Exclusive: Summer Collection 2025</h4>
                                                    <p onClick={() => {
                                                        handleFilterChange("Season", "Summer")
                                                        setProductType("SUMMER COLLECTION")
                                                        handleMouseLeave(setMen)
                                                        router.push("/drip")
                                                    }}>Shop Now</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* FILTER IS USED HERE */}

                        <AnimatePresence>
                            {rep && (
                                <motion.div
                                    className="rep"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => handleMouseEnter(setRep)}
                                    onMouseLeave={() => handleMouseLeave(setRep)}
                                >
                                    <div className="rep-filter" onMouseEnter={() => handleMouseLeave(setRep)}></div>
                                    <div className="rep-container">

                                        <div className='rep-clothing'>
                                            <h4>Clothing</h4>
                                            {
                                                rep_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "CLOTHING")
                                                        handleMouseLeave(setRep)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className='rep-clothing'>
                                            <h4>Accessories</h4>
                                            {
                                                rep_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "ACCESSORIES")
                                                        handleMouseLeave(setRep)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className="summer-collection">
                                            <div className="summer-card">
                                                <Image src={supabse_image_path('/ethnic.jpeg')} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                <div className="summer-card-detail">
                                                    <h4>Exclusive: Summer Collection 2025</h4>
                                                    <p onClick={() => {
                                                        handleFilterChange("Season", "Summer")
                                                        setProductType("SUMMER COLLECTION")
                                                        handleMouseLeave(setRep)
                                                        router.push("/drip")
                                                    }}>Shop Now</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {categories && (
                                <motion.div
                                    className="kids"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => handleMouseEnter(setCategories)}
                                    onMouseLeave={() => handleMouseLeave(setCategories)}
                                >
                                    <div className="kids-filter" onMouseEnter={() => handleMouseLeave(setCategories)}></div>

                                    <div className="kids-container">

                                        <div className='kids-clothing'>
                                            <h4>Clothing</h4>
                                            {
                                                kids_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "KID'S CLOTHING")
                                                        handleMouseLeave(setCategories)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className='kids-clothing'>
                                            <h4>Accessories</h4>
                                            {
                                                kids_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "KID'S ACCESSORIES")
                                                        handleMouseLeave(setCategories)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className="summer-collection">
                                            <div className="summer-card">
                                                <Image src={supabse_image_path('/kids.jpeg')} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                <div className="summer-card-detail">
                                                    <h4>Exclusive: Summer Collection 2025</h4>
                                                    <p onClick={() => {
                                                        handleFilterChange("Season", "Summer")
                                                        setProductType("SUMMER COLLECTION")
                                                        handleMouseLeave(setCategories)
                                                        router.push("/drip")
                                                    }}>Shop Now</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {conditions && (
                                <motion.div
                                    className="women"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => handleMouseEnter(setConditions)}
                                    onMouseLeave={() => handleMouseLeave(setConditions)}
                                >
                                    <div className="women-filter" onMouseEnter={() => handleMouseLeave(setConditions)}></div>

                                    <div className="women-container">

                                        <div className='women-clothing'>
                                            <h4>Clothing</h4>
                                            {
                                                women_clothing.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Women")
                                                        handleMouseLeave(setConditions)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className='women-clothing'>
                                            <h4>Accessories</h4>
                                            {
                                                women_accessories.map((item, index) => (
                                                    <p key={index} onClick={() => {
                                                        handleClick(item, "Women")
                                                        handleMouseLeave(setConditions)
                                                    }}>{item}</p>
                                                ))
                                            }
                                        </div>

                                        <div className="summer-collection">
                                            <div className="summer-card">
                                                <Image src={supabse_image_path('/women_summer.webp')} width={100} height={100} unoptimized alt='summer-collection' className='summer-image' />
                                                <div className="summer-card-detail">
                                                    <h4>Exclusive: Summer Collection 2025</h4>
                                                    <p onClick={() => {
                                                        handleFilterChange("Season", "Summer")
                                                        setProductType("SUMMER COLLECTION")
                                                        handleMouseLeave(setConditions)
                                                        router.push("/drip")
                                                    }}>Shop Now</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <div className="nav-tier2">

                            <div className="hamburger-container" onClick={() => setBurgerActive(!burgerActive)} style={{ marginRight: ".5rem" }}>
                                <div className={burgerActive ? "hamburger-menu burger-active" : "hamburger-menu"} ></div>
                            </div>

                            <div className='nav-tier2-one' onClick={() => setShowFlagBox(true)}>
                                <Image src={location.flag_image} height={20} width={30} alt='flag' style={{ borderRadius: "3px", overflow: "hidden" }} />
                                <p>{`${location.country_name}`}</p>
                            </div>

                            <div className='nav-tier2-two'>
                                <Image src={supabse_image_path('/dunyadriptransparent.png')} height={50} width={50} alt='dunya-drip-logo' unoptimized className='trial' onClick={() => router.push("/")} />
                                <Image src={supabse_image_path('/dunyatransparent.png')} height={50} width={50} alt='dunya-drip-logo' unoptimized className='trial1' onClick={() => router.push("/")} style={{ cursor: "pointer" }} />
                            </div>

                            <div className='nav-tier2-three'>
                                <div className='nav-tier2-login'>
                                    {
                                        user ? <Link href={"/dashboard"} style={{ textDecoration: "none" }}><Image src={signin} width={25} height={25} alt='signin' /></Link> : <Link className='next-link' href={"/login-out"}><p>Login</p></Link>
                                    }
                                </div>
                                <div className='nav-tier2-search'><Image src={supabse_image_path('/search.svg')} height={25} width={25} alt='search-svg' onClick={() => setShowSearchPanel(true)} /></div>
                                <div className='nav-tier2-bag' onClick={() => setShowCart(true)} ><Image src={supabse_image_path('/bag.svg')} height={20} width={20} alt='search-svg' />{cart.length !== 0 && <div className='bag-items'>{cart.length}</div>}</div>
                            </div>

                        </div>
                        {/* End of Nav Tier 2 */}

                        <div className='nav-links'>
                            <Link href="/drip" onClick={() => {
                                setExclusiveFilter(null, null)
                                setProductType("New In")
                                handleMouseLeave(setNewin)
                            }} className='links' id='categories' onMouseEnter={() => {
                                handleMouseEnter(setNewin, setMen)
                                setMen(false)
                            }} onMouseLeave={() => handleMouseLeave(setNewin)}>
                                <p>NEW IN</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href={"/drip"} className='links' onMouseEnter={() => {
                                handleMouseEnter(setMen, setNewin)
                                setConditions(false)
                            }} onMouseLeave={() => handleMouseLeave(setMen)} onClick={() => {
                                setExclusiveFilter("Men", null)
                                setProductType("Men")
                                handleMouseLeave(setMen)
                            }}>
                                <p>MEN</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href="/drip" onClick={() => {
                                setExclusiveFilter("Women", null)
                                setProductType("Women")
                                handleMouseLeave(setConditions)
                            }} className='links' id='wellsol' onMouseEnter={() => {
                                handleMouseEnter(setConditions, setMen)
                                setCategories(false)
                            }} onMouseLeave={() => handleMouseLeave(setConditions)}>
                                <p>WOMEN</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href="/drip" onClick={() => {
                                setExclusiveFilter("Kids", null)
                                setProductType("Kids")
                                handleMouseLeave(setCategories)
                            }} className='links' onMouseEnter={() => handleMouseEnter(setCategories, setConditions)} onMouseLeave={() => handleMouseLeave(setCategories)}>
                                <p>KIDS</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href="/drip" onClick={() => {
                                setExclusiveFilter(null, "Bags")
                                setProductType("Bags")
                            }} className='links' id='blogdiv'>
                                <p>BAGS</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href="/our_story" className='links' id='blogdiv'>
                                <p>BRAND</p>
                                <div className="indicator"></div>
                            </Link>
                            <Link href="/drip" onClick={() => {
                                setExclusiveFilter("Rep Your Country", null)
                                setProductType("Rep Your Country")
                            }} className='links' id='blogdiv' onMouseEnter={() => handleMouseEnter(setRep, setNewin)} onMouseLeave={() => handleMouseLeave(setRep)}>
                                <p>REP YOUR COUNTRY</p>
                                <div className="indicator"></div>
                            </Link>
                        </div>


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
