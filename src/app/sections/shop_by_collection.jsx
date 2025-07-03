import React from 'react'
import CollectionCircle from '../components/collection_circle'

const collection_array = [
    { image: "jacket.webp", label: "Jackets" },
    { image: "shoe3.webp", label: "Hoodies" },
    { image: "shoe.webp", label: "Sweatpants" },
    { image: "shoe4.webp", label: "Bags" },
    { image: "shoe3.webp", label: "T-Shirts" },
    { image: "shoe.webp", label: "Caps" },
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
