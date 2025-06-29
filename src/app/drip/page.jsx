"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { desert } from "../../../public/imports";
import DripCard from "../components/drip_card";
import { useCart } from "../contexts/cart_context";
import supabse_image_path from "@/utils/supabase/supabse_image_path";
import { useSort } from "../contexts/sort_context";

export default function Drip() {
    // State to track the open drawers
    const [hideDrawer, setHideDrawer] = useState({
        drawer1: false,
        drawer2: false,
        drawer3: false,
        drawer4: false,
        drawer5: false,
    });
    const [hide_filters, setHideFilters] = useState(false);
    const [sorts, setSorts] = useState("Newest")
    const sort_array = ["Newest", "Oldest", "Price High to Low", "Price Low to High"];
    const [hide_sorts, setHideSorts] = useState(false)
    // State to track selected items (for checkmark visibility)
    const [limit, setLimit] = useState(25);
    const [isMobile, setIsMobile] = useState(false);
    const { product, filteredProduct } = useCart();
    const { filterOptions, selectedItems, handleFilterChange, product_type, filters, to_filter } = useSort();



    const drip_filtered_products = product.filter(item => {
        // First filter by category based on to_filter
        const matchesCategory = to_filter === "All" || item.category === to_filter;

        // Then apply the other filters
        const matchesProductType = filters.product_type.length === 0 || filters.product_type.includes(item.product_type);
        const matchesColor = filters.color.length === 0 || filters.color.some(color => item.color.includes(color));
        const matchesSize = filters.size.length === 0 || filters.size.some(size => item.size.includes(size));
        const matchesSeason = filters.season.length === 0 || filters.season.some(season => item.season.includes(season));

        return matchesCategory && matchesProductType && matchesColor && matchesSize && matchesSeason;
    })
        .sort((a, b) => {
            if (sorts === "Newest") {
                return new Date(b.created_at) - new Date(a.created_at);
            }
            if (sorts === "Oldest") {
                return new Date(a.created_at) - new Date(b.created_at);
            }
            if (sorts === "Price Low to High") {
                return a.price - b.price;
            }
            if (sorts === "Price High to Low") {
                return b.price - a.price;
            }
            return 0;
        })


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check window size initially

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = (which_button) => {
        if (which_button === "Filters") {
            !isMobile ? setHideFilters(true) : null;
        } else if (which_button === "Sorts") {
            !isMobile ? setHideSorts(true) : null;
        }
    }

    const handleMouseLeave = (which_button) => {
        if (which_button === "Filters") {
            !isMobile ? setHideFilters(false) : null;
        } else if (which_button === "Sorts") {
            !isMobile ? setHideSorts(false) : null;
        }
    }

    const handleClick = (which_button) => {
        if (which_button === "Filters") {
            setHideFilters(!hide_filters)
        } else if (which_button === "Sorts") {
            setHideSorts(!hide_sorts)
        }
    };

    const handleDropDownClick = (event) => {
        event.stopPropagation();
    }

    // Data for filter sections

    // Function to toggle drawer visibility
    const openDrawer = (drawerKey) => {
        setHideDrawer((prev) => ({
            ...prev,
            [drawerKey]: !prev[drawerKey],
        }));
    };


    const limit_func = () => {
        if (limit + 25 <= drip_filtered_products.length - 1) {
            setLimit(limit + 25)
        } else {
            setLimit(drip_filtered_products.length - 1)
        }
        // limit + 25 <= extended_drip_array.length - 1 ? setLimit(limit + 25) :  
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }



    return (
        <div className="drip-main">
            <div className="drip-container">
                <div className="drip-header">
                    <div className="title">
                        <h1>{`${to_filter}'s ${product_type}`}</h1>
                    </div>
                    <div className="header-filters">
                        <div className="filter-by" onMouseEnter={() => handleMouseEnter("Filters")} onMouseLeave={() => handleMouseLeave("Filters")} onClick={() => handleClick("Filters")}>
                            <div className="filter-p">
                                <p>Filters</p>
                            </div>
                            <div className={hide_filters ? "filters" : "hide-parameter"} onClick={handleDropDownClick}>
                                {/* Dynamically render filter sections */}
                                {filterOptions.map(({ title, id, drawerKey, options }) => (
                                    <div className="parameters" key={drawerKey}>
                                        {/* Section Header */}
                                        <div className="one">
                                            <p>{title}<span style={id === "prc" ? { visibility: "visible" } : { visibility: "hidden" }} > {`(GBP)`}</span></p>
                                            <Image
                                                src={supabse_image_path('/plus.svg')}
                                                width={15}
                                                height={15}
                                                alt="plus-svg"
                                                className="plos"
                                                onClick={() => openDrawer(drawerKey)}
                                                style={hideDrawer[drawerKey] ? { transform: "rotate(-45deg)" } : { transform: "rotate(0deg)" }}
                                            />
                                        </div>

                                        {/* Options List */}
                                        <div className={hideDrawer[drawerKey] ? "one-parameters" : "hide-parameter"}>
                                            {options.map((option) => (
                                                <p key={option} onClick={() => handleFilterChange(title, option)} style={{ cursor: "pointer" }}>
                                                    <span>{selectedItems[option] ? "✅" : ""}</span> {option}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sort-by" onMouseEnter={() => handleMouseEnter("Sorts")} onMouseLeave={() => handleMouseLeave("Sorts")} onClick={() => handleClick("Sorts")}>
                            <div className="sort-p">
                                <p>Sort By: <span>{sorts}</span></p>
                            </div>

                            <div className={hide_sorts ? "sorts" : "hide-parameter"} onClick={handleDropDownClick}>
                                {
                                    sort_array.map((item, index) => (
                                        <p key={index} onClick={() => setSorts(item)}>{item}</p>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <div className="drip-cards">
                    {
                        drip_filtered_products.slice(0, limit).map((item, index) => (
                            <DripCard id={item.id} drip_image={item.image_url} product_name={item.name} product_price={item.price} index={index} key={`drip_card_component${index}`} />
                        ))
                    }
                </div>

                {
                    drip_filtered_products && drip_filtered_products.length > 0 ? (
                        <div className="limit-butt">
                            {
                                limit === product.length - 1 ? <button className="up-button" onClick={() => scrollToTop()}>Go Up</button> : <button className="limit-button" onClick={() => limit_func()}>
                                    Load more
                                </button>
                            }
                        </div>
                    ) : (
                        <div className="desert">
                            <Image src={desert} width={100} height={100} alt="desert" className="desert_img" />
                            <h2>No Items</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
