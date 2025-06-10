import React from 'react'
import CollectionCircle from '../components/collection_circle'

const collection_array = [
    { image: "jacket.webp", label: "Jackets" },
    { image: "shoe4.webp", label: "Shoes" },
    { image: "shoe3.webp", label: "Hoodies" },
    { image: "shoe.webp", label: "Chinos" },
    { image: "shoe4.webp", label: "Denim" },
    { image: "shoe3.webp", label: "T-shirts" },
    { image: "shoe.webp", label: "Pants" },
    { image: "shoe4.webp", label: "Accessories" }
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
