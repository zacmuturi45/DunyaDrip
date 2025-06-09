"use client"

import { getLocation } from "@/utils/getLocation";
import { createContext, useEffect, useState } from "react";
import { flag_array, UK_flag } from "../../../public/imports";

export const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
    const [location, setLocation] = useState({ flag_image: UK_flag, country_name: "UK", currency: "GBP" });
    const [apply_location, setApplyLocation] = useState({ flag_image: UK_flag, country_name: "UK", currency: "GBP" });
    const [flag_active, setFlagActive] = useState(false);
    const [color_index, setColorIndex] = useState(3000);
    const [showFlagBox, setShowFlagBox] = useState(false);
    const [timezone, setTimeZone] = useState("Great Britain");



    useEffect(() => {
        const fetchLocation = async () => {
            if(!navigator.onLine) {
                console.log("No interenet connection")
                return;
            }

            try {
                const data = await getLocation();
                setLocation(data)
                setTimeZone(data.timezone)
            } catch (error) {
                console.error("Error fetching location:", error);
            }
            
        };

        fetchLocation();
    }, []);

    return (
        <FlagContext.Provider value={{ color_index, setColorIndex, location, setLocation, apply_location, setApplyLocation, flag_active, setFlagActive, showFlagBox, setShowFlagBox, timezone }}>
            { children }
        </FlagContext.Provider>
    );
};