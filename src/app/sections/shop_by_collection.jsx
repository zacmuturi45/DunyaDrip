import React from 'react'
import CollectionCircle from '../components/collection_circle'

const collection_array = [
    { image: "puff_jack.png", label: "Jackets" },
    { image: "red_hoodie.png", label: "Hoodies" },
    { image: "sweatpants_black.png", label: "Sweatpants" },
    { image: "black_bag.png", label: "Bags" },
    { image: "graphic_tee.png", label: "T-Shirts" },
    { image: "cap_black.png", label: "Caps" },
    { image: "vrsty_jacket.png", label: "Varsity Jackets" },
    { image: "leather_vest.png", label: "Leather Vests" },
]

export default function ShopByCollection() {
    return (
        <div className='collection-main'>
            <div className="collection-container">
                <div className="title">
                    <h3>Shop by Collection</h3>
                    <p>New Arrivals</p>
                </div>
                <div className="array">
                    {
                        collection_array.map((item, index) => (
                            <CollectionCircle image={item.image} label={item.label} key={`collection_circle${index}`} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
