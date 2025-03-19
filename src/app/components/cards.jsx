import Image from 'next/image'
import React from 'react'
import { shoe } from '../../../public/imports'

export default function Cards({ image, product_name, price, key}) {
  return (
    <div className='card-main' key={key}>
        <div className="card-image"><Image src={image} width={100} height={100} alt='shoe-image' unoptimized /></div>
        <div className="details">
            <p>{product_name}</p>
            <p>{`$${price}`}</p>
        </div>
    </div>
  )
}
