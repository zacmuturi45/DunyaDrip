import Image from 'next/image'
import React from 'react'

export default function CollectionCircle({ image, label, key }) {
    return (
        <div className="collection-circles" key={key}>
            <div className="circle">
                <Image src={image} width={40} height={40} alt='jacket' unoptimized />
            </div>
            <p>{label}</p>
        </div>
    )
}
