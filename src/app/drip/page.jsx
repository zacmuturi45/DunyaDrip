"use client";

import Image from "next/image";
import React, { useState } from "react";
import { extended_drip_array, plus } from "../../../public/imports";
import DripCard from "../components/drip_card";

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
    const [selectedItems, setSelectedItems] = useState({});
    const [limit, setLimit] = useState(25);

    // Data for filter sections
    const filterOptions = [
        {
            title: "Product Type",
            drawerKey: "drawer1",
            options: [
                "Chino Shorts",
                "Summer Shorts",
                "Denim Shorts",
                "Swim Shorts",
                "Casual Shorts",
                "Trousers",
                "Tracksuits",
                "Casual Trousers",
            ],
        },
        {
            title: "Color",
            drawerKey: "drawer2",
            options: ["Black", "White", "Navy", "Beige", "Grey", "Olive"],
            id: "cl"
        },
        {
            title: "Size",
            drawerKey: "drawer3",
            options: ["XS", "S", "M", "L", "XL", "XXL"],
            id: "sz"
        },
        {
            title: "Price",
            drawerKey: "drawer4",
            options: ["Under  200", " 2,00 - 500", " 500 - 1000", "Above  1000"],
            id: "prc"
        },
        {
            title: "Season",
            drawerKey: "drawer5",
            options: ["Spring", "Summer", "Autumn", "Winter"],
            id: "szn"
        },
    ];

    // Function to toggle drawer visibility
    const openDrawer = (drawerKey) => {
        setHideDrawer((prev) => ({
            ...prev,
            [drawerKey]: !prev[drawerKey],
        }));
    };

    // Function to toggle checkmark visibility
    const toggleCheckmark = (option) => {
        setSelectedItems((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const limit_func = () => {
        if (limit + 25 <= extended_drip_array.length - 1) {
            setLimit(limit + 25)
        } else {
            setLimit(extended_drip_array.length - 1)
        }
        // limit + 25 <= extended_drip_array.length - 1 ? setLimit(limit + 25) :  
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    }
    

    return (
        <div className="drip-main">
            <div className="drip-container">
                <div className="drip-header">
                    <div className="title">
                        <h1>Trousers & Shorts</h1>
                        <p>Explore premium men's outerwear, designed for the modern man, seeking an edge to accentuate his bold persona.</p>
                    </div>
                    <div className="header-filters">
                        <div className="filter-by" onMouseEnter={() => setHideFilters(true)} onMouseLeave={() => setHideFilters(false)}>
                            <div className="filter-p">
                                <p>Filters</p>
                            </div>
                            <div className={hide_filters ? "filters" : "hide-parameter"}>
                                {/* Dynamically render filter sections */}
                                {filterOptions.map(({ title, id, drawerKey, options }) => (
                                    <div className="parameters" key={drawerKey}>
                                        {/* Section Header */}
                                        <div className="one">
                                            <p>{title}<span style={id === "prc" ? { visibility: "visible" } : { visibility: "hidden" }} > {`(GBP)`}</span></p>
                                            <Image
                                                src={plus}
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
                                                <p key={option} onClick={() => toggleCheckmark(option)} style={{ cursor: "pointer" }}>
                                                    <span>{selectedItems[option] ? "✅" : ""}</span> {option}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sort-by" onMouseEnter={() => setHideSorts(true)} onMouseLeave={() => setHideSorts(false)}>
                            <div className="sort-p">
                                <p>Sort By: <span>{sorts}</span></p>
                            </div>

                            <div className={hide_sorts ? "sorts" : "hide-parameter"}>
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
                        extended_drip_array.slice(0, limit).map((item, index) => (
                            <DripCard drip_image={item.image} product_name={item.product_name} product_price={item.product_price} index={index} key={`drip_card_component${index}`} />
                        ))
                    }
                </div>

                <div className="limit-butt">
                    {
                        limit === extended_drip_array.length - 1 ? <button className="up-button" onClick={() => scrollToTop()}>Go Up</button> : <button className="limit-button" onClick={() => limit_func()}>
                            Load more
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
