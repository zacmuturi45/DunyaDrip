import Image from 'next/image'
import React from 'react'
import { jacket, shoe } from '../../../public/imports'
import CollectionCircle from '../components/collection_circle'

const collection_array = [
    { image: jacket, label: "Jackets" },
    { image: shoe, label: "Shoes" },
    { image: shoe, label: "Hoodies" },
    { image: shoe, label: "Chinos" },
    { image: shoe, label: "Denim" },
    { image: shoe, label: "T-shirts" },
    { image: shoe, label: "Pants" },
    { image: shoe, label: "Accessories" }
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
