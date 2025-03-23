"use client"

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { FlagContext } from '../contexts/flagcontext'

export default function Featured_Card({ image, image2, product_name, product_price, index, id }) {
    const { location } = useContext(FlagContext);
    const [which_image, setWhichImage] = useState("image1")

    return (
        <div className='featured_card_main' key={index} >
            <div className="card-img">
                <Image src={image} width={100} height={100} alt='card-image' unoptimized className={which_image === "image1" ? "card-img1 card-z-index" : "card-img1"} />
                <Image src={image2} width={100} height={100} alt='card-image' unoptimized className={which_image === "image2" ? "card-img2 card-z-index" : "card-img2"} />
            </div>
            <div className="card-content">
                <div className="card-circle">
                    <div className={which_image === "image1" ? "black-circle" : "circle-div"} onClick={() => setWhichImage("image1")}><Image src={image} width={20} height={20} alt='image-2' className='card-circle-img' unoptimized /></div>
                    <div className={which_image === "image2" ? "black-circle" : "circle-div"} onClick={() => setWhichImage("image2")} ><Image src={image2} width={20} height={20} alt='image-2' className='card-circle-img' unoptimized /></div>
                </div>
                <p>{product_name}</p>
                <p><span>{location.currency}</span>{product_price}</p>
            </div>
        </div>
    )
}
