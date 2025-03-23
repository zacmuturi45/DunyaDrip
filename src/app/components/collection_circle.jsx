import Image from 'next/image'
import React from 'react'

export default function CollectionCircle({ image, label, index }) {
    return (
        <div className="collection-circles" key={index}>
            <div className="circle">
                <Image src={image} width={40} height={40} alt='jacket' unoptimized />
            </div>
            <p>{label}</p>
        </div>
    )
}
