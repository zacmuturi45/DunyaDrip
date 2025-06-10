import supabse_image_path from "./supabase/supabse_image_path";

interface IpWhoIsResponse {
    country?: string;
    currency?: string;
    timezone?: { abbr?: string };
    flag?: { img?: string };
}
interface IpApiCoResponse {
    country_name?: string;
    currency?: string;
    timezone?: string;
}

export const getLocation = async () => {
    const uk_flag = supabse_image_path('/flags/UK.svg')
    const getBrowserTimezone = () =>
        typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Europe/London";

    try {
        const online = typeof navigator !== 'undefined' && navigator.onLine;
        if (!online) {
            return {
                country_name: "UK",
                currency: "GBP",
                timezone: getBrowserTimezone(),
                flag_image: uk_flag
            };
        }

        const [ipwhoRes, ipapiRes] = await Promise.all([
            fetch("https://ipwho.is/"),
            fetch("https://ipapi.co/json/")
        ]);

        // Use type assertion to tell TS these are our expected shapes (or empty objects)
        const ipwhoData = (ipwhoRes.ok ? await ipwhoRes.json() : {}) as IpWhoIsResponse;
        const ipapiData = (ipapiRes.ok ? await ipapiRes.json() : {}) as IpApiCoResponse;

        return {
            country_name: ipwhoData.country || ipapiData.country_name || "UK",
            currency: ipapiData.currency || ipwhoData.currency || "GBP",
            timezone: ipwhoData.timezone?.abbr || ipapiData.timezone || getBrowserTimezone(),
            flag_image: ipwhoData.flag?.img || uk_flag
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return {
            country_name: "UK",
            currency: "GBP",
            timezone: getBrowserTimezone(),
            flag_image: uk_flag
        };
    }
};