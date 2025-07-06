"use client"

const { createContext, useContext, useState } = require("react");


const SortContext = createContext();

export const SortProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const [category, setCategory] = useState("Men");
    const [product_type, setProductType] = useState(null);
    const [to_filter, setToFilter] = useState("All")
    const [filters, setFilters] = useState({
        product_type: [],
        size: [],
        color: [],
        season: [],
    });


    const filterOptions = [
        {
            title: "Product Type",
            drawerKey: "drawer1",
            options: [
                "Hoodies",
                "Sweatpants",
                "T-Shirts",
                "Sweaters",
                "Varsity Jackets",
                "Leather Vests",
                "Bags",
                "Caps"
            ],
            id: "pt"
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
            title: "Season",
            drawerKey: "drawer5",
            options: ["Spring", "Summer", "Autumn", "Winter"],
            id: "szn"
        },
    ];

    // Function to toggle checkmark visibility
    const toggleCheckmark = (option) => {
        setSelectedItems((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const labelToKeyMap = {
        "Product Type": "product_type",
        "Size": "size",
        "Color": "color",
        "Season": "season"
    };

    const handleFilterChange = (label, value) => {
        setProductType("")
        toggleCheckmark(value);
        const key = labelToKeyMap[label];

        setFilters(prev => {
            const currentValues = prev[key];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [key]: newValues
            };
        });
    };

    const setSummerFilter = (category, toFilter, product_type = []) => {
        setFilters({
            product_type: product_type,
            size: [],
            color: [],
            season: category ? [category] : [],
        });
        product_type.forEach(type => toggleCheckmark(type))
        toggleCheckmark(category)
        setToFilter(toFilter || "All");

    };

    const setExclusiveFilter = (category, productType) => {
        setFilters({
            product_type: productType ? [productType] : [],
            size: [],
            color: [],
            season: [],
        });
        setToFilter(category || "All");
        setProductType(productType || "");
        setSelectedItems(productType ? { [productType]: true } : {});
    };


    return (
        <SortContext.Provider value={{ setSummerFilter, setExclusiveFilter, to_filter, setToFilter, filters, setFilters, handleFilterChange, selectedItems, setSelectedItems, filterOptions, toggleCheckmark, category, setCategory, product_type, setProductType }}>
            {children}
        </SortContext.Provider>
    )
}

export const useSort = () => {
    const context = useContext(SortContext);
    return context
}