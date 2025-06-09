import { ukflag } from "../../public/imports";

export const getLocation = async () => {
    try {
        const online = typeof navigator !== 'undefined' && navigator.onLine;

        if (!online) {
            return {
                country: "UK",
                currency: "GBP",
                timezone: "Local Time"
            }
        }
        const res = await fetch("https://ipwho.is/");
        const country_currency = await fetch("https://ipapi.co/json/");
        const currency_data = await country_currency.json();
        const data = await res.json();
        return {
            country_name: data.country_code || "UK",
            currency: currency_data.currency || "GBP",
            timezone: data.timezone.abbr || "Europe",
            flag_image: data.flag.img || ukflag
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return { country: "Unknown", currency: "Unknown", timezone: "unknown" };
    }
};