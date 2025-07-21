import USA from "./flags/USA.svg";
import Taiwan from "./flags/Taiwan.svg";
import Egypt from "./flags/Egypt.svg";
import France from "./flags/France.svg";
import Colombia from "./flags/Colombia.svg";
import South_Africa from "./flags/South_Africa.svg";
import UK from "./flags/UK.svg";
import Kenya from "./flags/Kenya.svg";
import Germany from "./flags/germany.svg";
import Netherlands from "./flags/netherlands.svg"
import Belgium from "./flags/belgium.svg";

const targetDate = new Date(Date.UTC(2025, 5, 25, 1, 0, 0)); // March 30, 2025, 01:00 AM UTC

export const calculateTimeLeft = () => {
    const now = new Date();

    const difference = targetDate - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / (1000)) % 60),
    }
}

export { default as UK_flag } from "./flags/UK.svg";
export { default as ukflag } from "./ukflag.svg";
export { default as cancel } from "./cancel.svg";
export { default as desert } from "./desert.svg";
export { default as search_head } from "./search-head.svg";
export { default as flags } from "./flags.svg";
export { default as sharp } from "./sharp_plus.svg";

// Object mapping country names (as returned by ipwho.is) to ISO currency codes

export const shippingData = [
    { country: "Austria", price: "£15.00", time: "3-5 working days" },
    { country: "Belgium", price: "£15.00", time: "3-5 working days" },
    { country: "Bulgaria", price: "£25.00", time: "5-7 working days" },
    { country: "Croatia", price: "£22.00", time: "4-6 working days" },
    { country: "Czech Republic", price: "£20.00", time: "4-6 working days" },
    { country: "Denmark", price: "£18.00", time: "3-5 working days" },
    { country: "Estonia", price: "£22.00", time: "4-6 working days" },
    { country: "Finland", price: "£22.00", time: "4-6 working days" },
    { country: "France", price: "£16.00", time: "3-5 working days" },
    { country: "Germany", price: "£16.00", time: "3-5 working days" },
    { country: "Greece", price: "£25.00", time: "5-7 working days" },
    { country: "Hungary", price: "£22.00", time: "4-6 working days" },
    { country: "Ireland", price: "£15.00", time: "3-5 working days" },
    { country: "Italy", price: "£18.00", time: "3-5 working days" },
    { country: "Latvia", price: "£22.00", time: "4-6 working days" },
    { country: "Lithuania", price: "£22.00", time: "4-6 working days" },
    { country: "Luxembourg", price: "£15.00", time: "3-5 working days" },
    { country: "Netherlands", price: "£15.00", time: "3-5 working days" },
    { country: "Poland", price: "£20.00", time: "4-6 working days" },
    { country: "Portugal", price: "£20.00", time: "4-6 working days" },
    { country: "Romania", price: "£25.00", time: "5-7 working days" },
    { country: "Slovakia", price: "£20.00", time: "4-6 working days" },
    { country: "Slovenia", price: "£20.00", time: "4-6 working days" },
    { country: "Spain", price: "£18.00", time: "3-5 working days" },
    { country: "Sweden", price: "£20.00", time: "4-6 working days" },
    { country: "USA", price: "£30.00", time: "5-10 working days" },
];

export const countryCurrencyMap = {
    "Afghanistan": "AFN",
    "Albania": "ALL",
    "Algeria": "DZD",
    "Andorra": "EUR",
    "Angola": "AOA",
    "Antigua and Barbuda": "XCD",
    "Argentina": "ARS",
    "Armenia": "AMD",
    "Australia": "AUD",
    "Austria": "EUR",
    "Azerbaijan": "AZN",
    "Bahamas": "BSD",
    "Bahrain": "BHD",
    "Bangladesh": "BDT",
    "Barbados": "BBD",
    "Belarus": "BYN",
    "Belgium": "EUR",
    "Belize": "BZD",
    "Benin": "XOF",
    "Bhutan": "BTN",
    "Bolivia": "BOB",
    "Bosnia and Herzegovina": "BAM",
    "Botswana": "BWP",
    "Brazil": "BRL",
    "Brunei": "BND",
    "Bulgaria": "BGN",
    "Burkina Faso": "XOF",
    "Burundi": "BIF",
    "Cabo Verde": "CVE",
    "Cambodia": "KHR",
    "Cameroon": "XAF",
    "Canada": "CAD",
    "Central African Republic": "XAF",
    "Chad": "XAF",
    "Chile": "CLP",
    "China": "CNY",
    "Colombia": "COP",
    "Comoros": "KMF",
    "Congo": "XAF",
    "Costa Rica": "CRC",
    "Croatia": "EUR",
    "Cuba": "CUP",
    "Cyprus": "EUR",
    "Czechia": "CZK",
    "Denmark": "DKK",
    "Djibouti": "DJF",
    "Dominica": "XCD",
    "Dominican Republic": "DOP",
    "Ecuador": "USD",
    "Egypt": "EGP",
    "El Salvador": "USD",
    "Equatorial Guinea": "XAF",
    "Eritrea": "ERN",
    "Estonia": "EUR",
    "Eswatini": "SZL",
    "Ethiopia": "ETB",
    "Fiji": "FJD",
    "Finland": "EUR",
    "France": "EUR",
    "Gabon": "XAF",
    "Gambia": "GMD",
    "Georgia": "GEL",
    "Germany": "EUR",
    "Ghana": "GHS",
    "Greece": "EUR",
    "Grenada": "XCD",
    "Guatemala": "GTQ",
    "Guinea": "GNF",
    "Guinea-Bissau": "XOF",
    "Guyana": "GYD",
    "Haiti": "HTG",
    "Honduras": "HNL",
    "Hungary": "HUF",
    "Iceland": "ISK",
    "India": "INR",
    "Indonesia": "IDR",
    "Iran": "IRR",
    "Iraq": "IQD",
    "Ireland": "EUR",
    "Israel": "ILS",
    "Italy": "EUR",
    "Jamaica": "JMD",
    "Japan": "JPY",
    "Jordan": "JOD",
    "Kazakhstan": "KZT",
    "Kenya": "KES",
    "Kiribati": "AUD",
    "Kuwait": "KWD",
    "Kyrgyzstan": "KGS",
    "Laos": "LAK",
    "Latvia": "EUR",
    "Lebanon": "LBP",
    "Lesotho": "LSL",
    "Liberia": "LRD",
    "Libya": "LYD",
    "Liechtenstein": "CHF",
    "Lithuania": "EUR",
    "Luxembourg": "EUR",
    "Madagascar": "MGA",
    "Malawi": "MWK",
    "Malaysia": "MYR",
    "Maldives": "MVR",
    "Mali": "XOF",
    "Malta": "EUR",
    "Marshall Islands": "USD",
    "Mauritania": "MRU",
    "Mauritius": "MUR",
    "Mexico": "MXN",
    "Micronesia": "USD",
    "Moldova": "MDL",
    "Monaco": "EUR",
    "Mongolia": "MNT",
    "Montenegro": "EUR",
    "Morocco": "MAD",
    "Mozambique": "MZN",
    "Myanmar": "MMK",
    "Namibia": "NAD",
    "Nauru": "AUD",
    "Nepal": "NPR",
    "Netherlands": "EUR",
    "New Zealand": "NZD",
    "Nicaragua": "NIO",
    "Niger": "XOF",
    "Nigeria": "NGN",
    "North Korea": "KPW",
    "North Macedonia": "MKD",
    "Norway": "NOK",
    "Oman": "OMR",
    "Pakistan": "PKR",
    "Palau": "USD",
    "Palestine": "ILS",
    "Panama": "PAB",
    "Papua New Guinea": "PGK",
    "Paraguay": "PYG",
    "Peru": "PEN",
    "Philippines": "PHP",
    "Poland": "PLN",
    "Portugal": "EUR",
    "Qatar": "QAR",
    "Romania": "RON",
    "Russia": "RUB",
    "Rwanda": "RWF",
    "Saint Kitts and Nevis": "XCD",
    "Saint Lucia": "XCD",
    "Saint Vincent and the Grenadines": "XCD",
    "Samoa": "WST",
    "San Marino": "EUR",
    "Sao Tome and Principe": "STN",
    "Saudi Arabia": "SAR",
    "Senegal": "XOF",
    "Serbia": "RSD",
    "Seychelles": "SCR",
    "Sierra Leone": "SLL",
    "Singapore": "SGD",
    "Slovakia": "EUR",
    "Slovenia": "EUR",
    "Solomon Islands": "SBD",
    "Somalia": "SOS",
    "South Africa": "ZAR",
    "South Korea": "KRW",
    "South Sudan": "SSP",
    "Spain": "EUR",
    "Sri Lanka": "LKR",
    "Sudan": "SDG",
    "Suriname": "SRD",
    "Sweden": "SEK",
    "Switzerland": "CHF",
    "Syria": "SYP",
    "Taiwan": "TWD",
    "Tajikistan": "TJS",
    "Tanzania": "TZS",
    "Thailand": "THB",
    "Timor-Leste": "USD",
    "Togo": "XOF",
    "Tonga": "TOP",
    "Trinidad and Tobago": "TTD",
    "Tunisia": "TND",
    "Turkey": "TRY",
    "Turkmenistan": "TMT",
    "Tuvalu": "AUD",
    "Uganda": "UGX",
    "Ukraine": "UAH",
    "United Arab Emirates": "AED",
    "United Kingdom": "GBP",
    "United States": "USD",
    "Uruguay": "UYU",
    "Uzbekistan": "UZS",
    "Vanuatu": "VUV",
    "Vatican City": "EUR",
    "Venezuela": "VES",
    "Vietnam": "VND",
    "Yemen": "YER",
    "Zambia": "ZMW",
    "Zimbabwe": "ZWL"
};

export const countryCodes = [
    { code: "+1", country: "USA/Canada" },
    { code: "+44", country: "United Kingdom" },
    { code: "+254", country: "Kenya" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+86", country: "China" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+234", country: "Nigeria" },
    { code: "+971", country: "UAE" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+34", country: "Spain" },
    { code: "+39", country: "Italy" },
    { code: "+351", country: "Portugal" },
    { code: "+7", country: "Russia" },
    { code: "+82", country: "South Korea" },
    { code: "+90", country: "Turkey" },
    { code: "+31", country: "Netherlands" },
    { code: "+46", country: "Sweden" },
    { code: "+47", country: "Norway" },
    { code: "+358", country: "Finland" },
    { code: "+48", country: "Poland" },
    { code: "+420", country: "Czech Republic" },
    { code: "+32", country: "Belgium" },
    { code: "+41", country: "Switzerland" },
    { code: "+380", country: "Ukraine" },
    { code: "+40", country: "Romania" },
    { code: "+20", country: "Egypt" },
    { code: "+212", country: "Morocco" },
    { code: "+62", country: "Indonesia" },
    { code: "+63", country: "Philippines" },
    { code: "+60", country: "Malaysia" },
    { code: "+66", country: "Thailand" },
    { code: "+84", country: "Vietnam" },
    { code: "+880", country: "Bangladesh" },
    { code: "+92", country: "Pakistan" },
    { code: "+98", country: "Iran" },
    { code: "+353", country: "Ireland" },
    { code: "+64", country: "New Zealand" },
    { code: "+52", country: "Mexico" },
    { code: "+57", country: "Colombia" },
    { code: "+56", country: "Chile" },
    { code: "+595", country: "Paraguay" },
    { code: "+598", country: "Uruguay" },
    { code: "+505", country: "Nicaragua" },
    { code: "+507", country: "Panama" },
    { code: "+51", country: "Peru" },
    { code: "+54", country: "Argentina" },
];

// export { default as stripe } from "./stripe.svg";
// export { default as klarna } from "./klarna.svg";
// export { default as paypal } from "./paypal.svg";
// export { default as visa } from "./visa.svg";
// export { default as mastercard } from "./mastercard.svg";
// export { default as gpay } from "./gpay.svg";
// export { default as appay } from "./appay.svg";
// export { default as amex } from "./amex.svg";
// export { default as discover } from "./discover.svg";
// export { default as diners } from "./diners.svg";
// export { default as elo } from "./elo.svg";
// export { default as unionpay } from "./unionpay.svg";

export const countries = [
    { country_value: "Afghanistan" },
    { country_value: "Albania" },
    { country_value: "Algeria" },
    { country_value: "Andorra" },
    { country_value: "Angola" },
    { country_value: "Antigua and Barbuda" },
    { country_value: "Argentina" },
    { country_value: "Armenia" },
    { country_value: "Australia" },
    { country_value: "Austria" },
    { country_value: "Azerbaijan" },
    { country_value: "Bahamas" },
    { country_value: "Bahrain" },
    { country_value: "Bangladesh" },
    { country_value: "Barbados" },
    { country_value: "Belarus" },
    { country_value: "Belgium" },
    { country_value: "Belize" },
    { country_value: "Benin" },
    { country_value: "Bhutan" },
    { country_value: "Bolivia" },
    { country_value: "Bosnia and Herzegovina" },
    { country_value: "Botswana" },
    { country_value: "Brazil" },
    { country_value: "Brunei" },
    { country_value: "Bulgaria" },
    { country_value: "Burkina Faso" },
    { country_value: "Burundi" },
    { country_value: "Cabo Verde" },
    { country_value: "Cambodia" },
    { country_value: "Cameroon" },
    { country_value: "Canada" },
    { country_value: "Central African Republic" },
    { country_value: "Chad" },
    { country_value: "Chile" },
    { country_value: "China" },
    { country_value: "Colombia" },
    { country_value: "Comoros" },
    { country_value: "Congo, Democratic Republic of the" },
    { country_value: "Congo, Republic of the" },
    { country_value: "Costa Rica" },
    { country_value: "Croatia" },
    { country_value: "Cuba" },
    { country_value: "Cyprus" },
    { country_value: "Czech Republic" },
    { country_value: "Denmark" },
    { country_value: "Djibouti" },
    { country_value: "Dominica" },
    { country_value: "Dominican Republic" },
    { country_value: "Ecuador" },
    { country_value: "Egypt" },
    { country_value: "El Salvador" },
    { country_value: "Equatorial Guinea" },
    { country_value: "Eritrea" },
    { country_value: "Estonia" },
    { country_value: "Eswatini" },
    { country_value: "Ethiopia" },
    { country_value: "Fiji" },
    { country_value: "Finland" },
    { country_value: "France" },
    { country_value: "Gabon" },
    { country_value: "Gambia" },
    { country_value: "Georgia" },
    { country_value: "Germany" },
    { country_value: "Ghana" },
    { country_value: "Greece" },
    { country_value: "Grenada" },
    { country_value: "Guatemala" },
    { country_value: "Guinea" },
    { country_value: "Guinea-Bissau" },
    { country_value: "Guyana" },
    { country_value: "Haiti" },
    { country_value: "Honduras" },
    { country_value: "Hungary" },
    { country_value: "Iceland" },
    { country_value: "India" },
    { country_value: "Indonesia" },
    { country_value: "Iran" },
    { country_value: "Iraq" },
    { country_value: "Ireland" },
    { country_value: "Israel" },
    { country_value: "Italy" },
    { country_value: "Jamaica" },
    { country_value: "Japan" },
    { country_value: "Jordan" },
    { country_value: "Kazakhstan" },
    { country_value: "Kenya" },
    { country_value: "Kiribati" },
    { country_value: "Korea, North" },
    { country_value: "Korea, South" },
    { country_value: "Kuwait" },
    { country_value: "Kyrgyzstan" },
    { country_value: "Laos" },
    { country_value: "Latvia" },
    { country_value: "Lebanon" },
    { country_value: "Lesotho" },
    { country_value: "Liberia" },
    { country_value: "Libya" },
    { country_value: "Liechtenstein" },
    { country_value: "Lithuania" },
    { country_value: "Luxembourg" },
    { country_value: "Madagascar" },
    { country_value: "Malawi" },
    { country_value: "Malaysia" },
    { country_value: "Maldives" },
    { country_value: "Mali" },
    { country_value: "Malta" },
    { country_value: "Marshall Islands" },
    { country_value: "Mauritania" },
    { country_value: "Mauritius" },
    { country_value: "Mexico" },
    { country_value: "Micronesia" },
    { country_value: "Moldova" },
    { country_value: "Monaco" },
    { country_value: "Mongolia" },
    { country_value: "Montenegro" },
    { country_value: "Morocco" },
    { country_value: "Mozambique" },
    { country_value: "Myanmar" },
    { country_value: "Namibia" },
    { country_value: "Nauru" },
    { country_value: "Nepal" },
    { country_value: "Netherlands" },
    { country_value: "New Zealand" },
    { country_value: "Nicaragua" },
    { country_value: "Niger" },
    { country_value: "Nigeria" },
    { country_value: "North Macedonia" },
    { country_value: "Norway" },
    { country_value: "Oman" },
    { country_value: "Pakistan" },
    { country_value: "Palau" },
    { country_value: "Palestine" },
    { country_value: "Panama" },
    { country_value: "Papua New Guinea" },
    { country_value: "Paraguay" },
    { country_value: "Peru" },
    { country_value: "Philippines" },
    { country_value: "Poland" },
    { country_value: "Portugal" },
    { country_value: "Qatar" },
    { country_value: "Romania" },
    { country_value: "Russia" },
    { country_value: "Rwanda" },
    { country_value: "Saint Kitts and Nevis" },
    { country_value: "Saint Lucia" },
    { country_value: "Saint Vincent and the Grenadines" },
    { country_value: "Samoa" },
    { country_value: "San Marino" },
    { country_value: "Sao Tome and Principe" },
    { country_value: "Saudi Arabia" },
    { country_value: "Senegal" },
    { country_value: "Serbia" },
    { country_value: "Seychelles" },
    { country_value: "Sierra Leone" },
    { country_value: "Singapore" },
    { country_value: "Slovakia" },
    { country_value: "Slovenia" },
    { country_value: "Solomon Islands" },
    { country_value: "Somalia" },
    { country_value: "South Africa" },
    { country_value: "South Sudan" },
    { country_value: "Spain" },
    { country_value: "Sri Lanka" },
    { country_value: "Sudan" },
    { country_value: "Suriname" },
    { country_value: "Sweden" },
    { country_value: "Switzerland" },
    { country_value: "Syria" },
    { country_value: "Taiwan" },
    { country_value: "Tajikistan" },
    { country_value: "Tanzania" },
    { country_value: "Thailand" },
    { country_value: "Timor-Leste" },
    { country_value: "Togo" },
    { country_value: "Tonga" },
    { country_value: "Trinidad and Tobago" },
    { country_value: "Tunisia" },
    { country_value: "Turkey" },
    { country_value: "Turkmenistan" },
    { country_value: "Tuvalu" },
    { country_value: "Uganda" },
    { country_value: "Ukraine" },
    { country_value: "United Arab Emirates" },
    { country_value: "United Kingdom" },
    { country_value: "United States" },
    { country_value: "Uruguay" },
    { country_value: "Uzbekistan" },
    { country_value: "Vanuatu" },
    { country_value: "Vatican City" },
    { country_value: "Venezuela" },
    { country_value: "Vietnam" },
    { country_value: "Yemen" },
    { country_value: "Zambia" },
    { country_value: "Zimbabwe" }
];


export const size_array = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL"
]

export const localTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const timeZoneOffset = -now.getTimezoneOffset() / 60
    const gmtSign = timeZoneOffset >= 0 ? '+' : '-';
    const gmtOffset = `${gmtSign}${Math.abs(timeZoneOffset)}`;

    const formattedHours = hours >= 10 ? hours : `0${hours}`
    const formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`

    const am_pm = hours >= 12 ? 'PM' : 'AM';

    const time_now = `${formattedHours}:${formattedMinutes} ${am_pm} GMT${gmtOffset}`

    return time_now
}



export const newInArray = [
    "Hoodies",
    "Sweatpants",
    "T-Shirts"
]

export const men_clothing = [
    "Hoodies",
    "Sweaters",
    "Sweatpants",
    "Varsity Jackets",
    "Leather Vests",
    "T-Shirts",
]

export const men_kicks = [
    "Sneakers",
    "Boots",
    "Shoes",
    "Slides",
    "Formal"
]

export const men_accessories = [
    "Bags",
    "Caps"
]

export const accessories = [
    "Hats",
    "Scarves",
    "Wallets",
    "Belts",
    "Arafat",
    "Shirts"
]

export const women_clothing = [
    "Hoodies",
    "Sweaters",
    "Sweatpants",
    "Varsity Jackets",
    "T-Shirts",
];

export const women_kicks = [
    "Heels",
    "Flats",
    "Sneakers",
    "Boots",
    "Sandals"
];

export const women_accessories = [
    "Caps",
    "Bags",
    "Leggings",
];

export const rep_clothing = [
    "National Team Jerseys",   // Football, basketball, etc.
    "Flag-Themed Clothing",    // T-shirts, hoodies, scarves
    "Traditional Attire",      // Kimonos, Dashikis, Dirndls, etc.
    "Ethnic Print Outfits",    // Ankara, Batik, Paisley designs
    "Slogan Tees"             // "Proudly [Country Name]" T-shirts
];

export const rep_footwear = [
    "Country-Themed Sneakers", // Shoes with country colors/logos
    "Festival Sandals",        // Sandals with cultural patterns
    "Heritage Loafers",        // Loafers with national designs
    "Customized Sports Shoes"  // Sneakers inspired by national teams
];

export const rep_accessories = [
    "Cultural Accessories",    // Beaded jewelry, bangles, hats
    "Patriotic Caps & Hats",   // Caps with national emblems
    "Heritage Bags",           // Bags with cultural patterns
    "Flag-Themed Scarves",     // Scarves with country colors
    "Festival Wristbands"      // Wristbands with country slogans
];

export const kids_clothing = [
    "Hoodies",
    "Sweaters",
    "Sweatpants",
    "T-Shirts",
];

export const kids_accessories = [
    "Caps",
    "Bags",
];

export const flag_array = [
  { flag_image: UK, country_name: "UK", currency: "GBP" },
  { flag_image: France, country_name: "France", currency: "EUR" },
  { flag_image: Germany, country_name: "Germany", currency: "EUR" },
  { flag_image: Netherlands, country_name: "Netherlands", currency: "EUR" },
  { flag_image: Belgium, country_name: "Belgium", currency: "EUR" }
];

export const countries_we_ship_to = [
    "UK",
    "Germany",
    "Netherlands",
    "Belgium",
    "France",
];

export const SHIPPING_RATES = {
  UK: {
    Standard: 3.99,
    Express: 6.99,
    "Next Day": 8.99
  },
  France: {
    Standard: 9.99,
    Express: 14.99,
    "Next Day": 19.99
  },
  Germany: {
    Standard: 9.99,
    Express: 14.99,
    "Next Day": 19.99
  },
  Netherlands: {
    Standard: 9.99,
    Express: 14.99,
    "Next Day": 19.99
  },
  Belgium: {
    Standard: 9.99,
    Express: 14.99,
    "Next Day": 19.99
  }
};


export const SHIPPING_RATES_FULL = {
    UK: {
        Standard: 3.99,
        Express: 6.99,
        "Next Day": 8.99
    },
    Austria: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Belgium: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Bulgaria: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Croatia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Cyprus: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Czechia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Denmark: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Estonia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Finland: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    France: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Germany: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Greece: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Hungary: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Ireland: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Italy: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Latvia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Lithuania: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Luxembourg: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Malta: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Netherlands: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Poland: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Portugal: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Romania: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Slovakia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Slovenia: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Spain: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    },
    Sweden: {
        Standard: 9.99,
        Express: 14.99,
        "Next Day": 19.99
    }
};
