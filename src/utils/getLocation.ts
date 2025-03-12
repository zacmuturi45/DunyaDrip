export const getLocation = async () => {
    try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        return {
            country: data.country_name,
            currency: data.currency
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return { country: "Unknown", currency: "Unknown" };
    }
};