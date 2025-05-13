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
        const data = await res.json();
        return {
            country: data.country,
            currency: data.continent_code,
            timezone: data.timezone.abbr
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return { country: "Unknown", currency: "Unknown", timezone: "unknown" };
    }
};