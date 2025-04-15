import USA from "./flags/USA.svg";
import Taiwan from "./flags/Taiwan.svg";
import Egypt from "./flags/Egypt.svg";
import France from "./flags/France.svg";
import Colombia from "./flags/Colombia.svg";
import South_Africa from "./flags/South_Africa.svg";
import UK from "./flags/UK.svg";
import Kenya from "./flags/Kenya.svg";

const targetDate = new Date(Date.UTC(2025, 2, 30, 1, 0, 0)); // March 30, 2025, 01:00 AM UTC

export const calculateTimeLeft = () => {
    const now = new Date();

    const difference = targetDate - now;

    if (difference <=0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24 )),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24 ),
        minutes: Math.floor((difference / (1000 * 60 )) % 60),
        seconds: Math.floor((difference / (1000)) % 60 ),
    }
}

import featured_1 from "./dunya_featured1.webp";
import featured_2 from "./dunya_featured2.webp";
import featured_3 from "./dunya_featured3.webp";
import featured_4 from "./dunya_featured4.webp";
import featured_5 from "./dunya_featured1b.webp";
import featured_6 from "./dunya_featured2b.webp";
import featured_1b from "./dunya_featured1b.webp";
import featured_2b from "./dunya_featured2b.webp";
import featured_3b from "./dunya_featured3b.webp";
import featured_4b from "./dunya_featured4b.webp";
import featured_5b from "./dunya_featured5b.webp";
import featured_6b from "./dunya_featured6b.webp";

import white_1b from "./white1b.webp";
import white_2b from "./white2b.webp";
import white_3b from "./white3b.webp";
import white_4b from "./white4b.webp";
import white_5b from "./white5b.webp";
import white_6b from "./white6b.webp";


import white_1 from "./white1.webp";
import white_2 from "./white2.webp";
import white_3 from "./white3.webp";
import white_4 from "./white4.webp";
import white_5 from "./white5.webp";
import white_6 from "./white6.webp";


export { default as trial } from "./trial.jpeg";
export { default as search } from "./search.svg";
export { default as bag } from "./bag.svg";
export { default as signin } from "./signin.svg";
export { default as ukflag } from "./ukflag.svg";
export { default as x } from "./x.svg";
export { default as shoe } from "./shoe.webp";
export { default as shoe1 } from "./shoe4.webp";
export { default as shoe2 } from "./shoe2.webp";
export { default as shoe3 } from "./shoe3.webp";
export { default as jacket } from "./jacket.webp";
export { default as summer } from "./summer.webp";
export { default as women_summer } from "./women_summer.webp";
export { default as ethnic } from "./ethnic.jpeg";
export { default as summer_newin } from "./newin.webp";
export { default as kids } from "./kids.jpg";
export { default as UK_flag } from "./flags/UK.svg";
export { default as arrow } from "./arrow.svg";
export { default as plus } from "./plus.svg";
export { default as facebook } from "./facebook.svg";
export { default as tiktok } from "./tiktok.svg";
export { default as youtube } from "./youtube.svg";
export { default as instagram } from "./instagram.svg";
export { default as trial2 } from "./trial2.jpeg";
export { default as trial1 } from "./trial.png";
export { default as dunya } from "./dunyatransparent.png";
export { default as dunyadrip } from "./dunyadriptransparent.png";
export { default as hero1 } from "./dunya_hero1.webp";
export { default as hero6 } from "./dunya_hero2.jpg";
export { default as hero2 } from "./dunya_hero2.jpg";
export { default as hero3 } from "./dunya_hero3.jpg";
export { default as hero4 } from "./dunya_hero4.jpg";
export { default as hero5 } from "./dunya_hero5.jpg";
export { default as hero7 } from "./dunya_hero6.webp";
export { default as hero8 } from "./dunya_hero8.jpg";
export { default as arrow_right } from "./arrow_right.svg";
export { default as textured } from "./textured.jpg";
export { default as streetwear1 } from "./streetwear.webp";
export { default as globe } from "./globe.svg";
export { default as nav_insta } from "./nav_insta.svg";
export { default as nav_fb } from "./nav_fb.svg";
export { default as black_start } from "./black_star.svg";
export { default as size } from "./size.svg";


export { default as white1 } from "./white1.webp";
export { default as white2 } from "./white2.webp";
export { default as white3 } from "./white3.webp";
export { default as white4 } from "./white4.webp";
export { default as white5 } from "./white5.webp";
export { default as white6 } from "./white6.webp";


export { default as carl_main } from "./carl_main.jpeg";
export { default as carl_one } from "./carl_one.jpeg";
export { default as carl_two } from "./carl_two.jpeg";
export { default as dark_one } from "./dark_one.jpeg";
export { default as dark_two } from "./dark_two.jpeg";

export { default as stripe } from "./stripe.svg";
export { default as klarna } from "./klarna.svg";
export { default as paypal } from "./paypal.svg";
export { default as visa } from "./visa.svg";
export { default as mastercard } from "./mastercard.svg";
export { default as gpay } from "./gpay.svg";
export { default as appay } from "./appay.svg";
export { default as amex } from "./amex.svg";
export { dark_black } from "./dark_black.jpg";

export const size_array = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL"
]

export const featured_array = [
    { image: white_1, image2: white_1b, product_name: "Puff Jacket", product_price: "85", id: 100 },
    { image: white_2, image2: white_2b, product_name: "Urban Shadow Hoodie", product_price: "65", id: 101 },
    { image: white_3, image2: white_3b, product_name: "Street Luxe Cargo Pants", product_price: "75", id: 102 },
    { image: white_4, image2: white_4b, product_name: "Neo-Futurist Windbreaker", product_price: "90", id: 103 },
    { image: white_5, image2: white_5b, product_name: "DripMode Graphic Tee", product_price: "50", id: 104 },
    { image: white_6, image2: white_6b, product_name: "Retro Varsity Bomber", product_price: "120", id: 106 },
    { image: white_1, image2: white_1b, product_name: "Puff Jacket", product_price: "85", id: 107 },
    { image: white_2, image2: white_2b, product_name: "Urban Shadow Hoodie", product_price: "65", id: 108 },
    { image: white_3, image2: white_3b, product_name: "Street Luxe Cargo Pants", product_price: "75", id: 109 },
    { image: white_4, image2: white_4b, product_name: "Neo-Futurist Windbreaker", product_price: "90", id: 110 },
    { image: white_5, image2: white_5b, product_name: "DripMode Graphic Tee", product_price: "50", id: 111 },
    { image: white_6, image2: white_6b, product_name: "Retro Varsity Bomber", product_price: "120", id: 112 },
];

export const drip_array = [
    { image: white_1, image2: white_1b, product_name: "Puff Jacket", product_price: "85", id: 200 },
    { image: white_2, image2: white_2b, product_name: "Urban Shadow Hoodie", product_price: "65", id: 201 },
    { image: white_3, image2: white_3b, product_name: "Street Luxe Cargo Pants", product_price: "75", id: 202 },
    { image: white_4, image2: white_4b, product_name: "Neo-Futurist Windbreaker", product_price: "90", id: 203 },
    { image: white_5, image2: white_5b, product_name: "DripMode Graphic Tee", product_price: "50", id: 204 },
    { image: white_6, image2: white_6b, product_name: "Retro Varsity Bomber", product_price: "120", id: 205 },
    { image: white_1, image2: white_1b, product_name: "Techwear Puffer", product_price: "110", id: 206 },
    { image: white_2, image2: white_2b, product_name: "Stealth Mode Hoodie", product_price: "70", id: 207 },
    { image: white_3, image2: white_3b, product_name: "Combat Cargo Pants", product_price: "80", id: 208 },
    { image: white_4, image2: white_4b, product_name: "Windproof Shell Jacket", product_price: "95", id: 209 },
    { image: white_5, image2: white_5b, product_name: "Minimalist Street Tee", product_price: "55", id: 210 },
    { image: white_6, image2: white_6b, product_name: "Vintage Bomber", product_price: "130", id: 211 },
    { image: white_1, image2: white_1b, product_name: "Urban Combat Jacket", product_price: "99", id: 212 },
    { image: white_2, image2: white_2b, product_name: "Graphic Oversized Hoodie", product_price: "85", id: 213 },
    { image: white_3, image2: white_3b, product_name: "Tactical Cargo Trousers", product_price: "88", id: 214 },
    { image: white_4, image2: white_4b, product_name: "Futuristic Anorak", product_price: "102", id: 215 },
    { image: white_5, image2: white_5b, product_name: "Skater Fit Tee", product_price: "45", id: 216 },
    { image: white_6, image2: white_6b, product_name: "Classic Varsity Jacket", product_price: "140", id: 217 },
    { image: white_1, image2: white_1b, product_name: "Stormproof Puffer", product_price: "115", id: 218 },
    { image: white_2, image2: white_2b, product_name: "Cyberpunk Hoodie", product_price: "95", id: 219 },
    { image: white_3, image2: white_3b, product_name: "Slim Fit Joggers", product_price: "78", id: 220 },
    { image: white_4, image2: white_4b, product_name: "Lightweight Parka", product_price: "100", id: 221 },
    { image: white_5, image2: white_5b, product_name: "Urban Fit Tee", product_price: "48", id: 222 },
    { image: white_6, image2: white_6b, product_name: "Retro Leather Bomber", product_price: "150", id: 223 },
    { image: white_1, image2: white_1b, product_name: "Hybrid Puffer", product_price: "98", id: 224 },
    { image: white_2, image2: white_2b, product_name: "Oversized Street Hoodie", product_price: "82", id: 225 },
    { image: white_3, image2: white_3b, product_name: "Elastic Waist Cargo Pants", product_price: "85", id: 226 },
    { image: white_4, image2: white_4b, product_name: "Techwear Rain Jacket", product_price: "110", id: 227 },
    { image: white_5, image2: white_5b, product_name: "Oversized Cotton Tee", product_price: "52", id: 228 },
    { image: white_6, image2: white_6b, product_name: "Heritage Varsity Jacket", product_price: "125", id: 229 },
    { image: white_1, image2: white_1b, product_name: "Stealth Winter Puffer", product_price: "112", id: 230 },
    { image: white_2, image2: white_2b, product_name: "Monochrome Hoodie", product_price: "77", id: 231 },
    { image: white_3, image2: white_3b, product_name: "Convertible Cargo Pants", product_price: "95", id: 232 },
    { image: white_4, image2: white_4b, product_name: "All-Weather Windbreaker", product_price: "105", id: 233 },
    { image: white_5, image2: white_5b, product_name: "Minimalist Logo Tee", product_price: "49", id: 234 },
    { image: white_6, image2: white_6b, product_name: "Varsity Heritage Bomber", product_price: "135", id: 235 },
];

// Duplicating and shuffling the list until we reach 80 items
export const extended_drip_array = Array.from({ length: 80 }, (_, index) => {
    const item = drip_array[index % drip_array.length]; // Loop through existing items
    return {
        ...item,
        id: 236 + index, // Unique ID
    };
});



export const localTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const timeZoneOffset = -now.getTimezoneOffset() / 60
    const gmtSign = timeZoneOffset >= 0 ? '+' : '-';
    const gmtOffset = `${gmtSign}${Math.abs(timeZoneOffset)}`;

    const formattedHours = hours >=10 ? hours : `0${hours}`
    const formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`

    const am_pm = hours >= 12 ? 'PM' : 'AM';

    const time_now = `${formattedHours}:${formattedMinutes} ${am_pm} GMT${gmtOffset}`

    return time_now
}



export const newInArray = [
    "Men's new in",
    "Women's new in", 
    "Kid's new in"
]

export const men_clothing = [
    "T-shirts",
    "Sweatshirts",
    "Coats",
    "Chinos",
    "Denim",
    "Shirts",
    "Shorts",
    "Underwear"
]

export const men_kicks = [
    "Sneakers",
    "Boots",
    "Shoes",
    "Slides",
    "Formal"
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
    "Dresses",
    "Tops",
    "Blouses",
    "Sweaters",
    "Jackets",
    "Jeans",
    "Skirts",
    "Leggings",
    "Lingerie"
];

export const women_kicks = [
    "Heels",
    "Flats",
    "Sneakers",
    "Boots",
    "Sandals"
];

export const women_accessories = [
    "Handbags",
    "Earrings",
    "Necklaces",
    "Bracelets",
    "Sunglasses",
    "Hats",
    "Scarves"
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
    "T-Shirts",
    "Sweatshirts",
    "Jackets",
    "Jeans",
    "Shorts",
    "Dresses",
    "Leggings",
    "Sleepwear",
    "School Uniforms"
];

export const kids_kicks = [
    "Sneakers",
    "Sandals",
    "Boots",
    "Slip-Ons",
    "Formal Shoes",
    "Running Shoes"
];

export const kids_accessories = [
    "Hats",
    "Scarves",
    "Backpacks",
    "Belts",
    "Gloves",
    "Socks",
    "Sunglasses",
    "Hairbands"
];

export const flag_array = [
    { flag_image: UK, country_name: "UK", currency: "GBP" },
    { flag_image: South_Africa, country_name: "South Africa", currency: "ZAR" },
    { flag_image: Taiwan, country_name: "Taiwan", currency: "TWD" },
    { flag_image: France, country_name: "France", currency: "EUR" },
    { flag_image: Egypt, country_name: "Egypt", currency: "EGP" },
    { flag_image: Colombia, country_name: "Colombia", currency: "COP" },
    { flag_image: USA, country_name: "United States", currency: "USD" },
    { flag_image: Kenya, country_name: "Kenya", currency: "KES" },
    { flag_image: UK, country_name: "UK", currency: "GBP" },
    { flag_image: South_Africa, country_name: "South Africa", currency: "ZAR" },
    { flag_image: Taiwan, country_name: "Taiwan", currency: "TWD" },
    { flag_image: France, country_name: "France", currency: "EUR" },
    { flag_image: Egypt, country_name: "Egypt", currency: "EGP" },
    { flag_image: Colombia, country_name: "Colombia", currency: "COP" },
    { flag_image: USA, country_name: "United States", currency: "USD" },
    { flag_image: Kenya, country_name: "Kenya", currency: "KES" },
    { flag_image: UK, country_name: "UK", currency: "GBP" },
    { flag_image: South_Africa, country_name: "South Africa", currency: "ZAR" },
    { flag_image: Taiwan, country_name: "Taiwan", currency: "TWD" },
    { flag_image: France, country_name: "France", currency: "EUR" },
    { flag_image: Egypt, country_name: "Egypt", currency: "EGP" },
    { flag_image: Colombia, country_name: "Colombia", currency: "COP" },
    { flag_image: USA, country_name: "United States", currency: "USD" },
    { flag_image: Kenya, country_name: "Kenya", currency: "KES" },
    { flag_image: UK, country_name: "UK", currency: "GBP" },
    { flag_image: South_Africa, country_name: "South Africa", currency: "ZAR" },
    { flag_image: Taiwan, country_name: "Taiwan", currency: "TWD" },
    { flag_image: France, country_name: "France", currency: "EUR" },
    { flag_image: Egypt, country_name: "Egypt", currency: "EGP" },
    { flag_image: Colombia, country_name: "Colombia", currency: "COP" },
    { flag_image: USA, country_name: "United States", currency: "USD" },
    { flag_image: Kenya, country_name: "Kenya", currency: "KES" },
];
