import Image from 'next/image'
import React from 'react'
import { hero1, hero2, hero3, hero4, hero5, hero6, hero8, streetwear1 } from '../../../public/imports'

export default function Wild() {
    return (
        <div className='wild-main'>
            <div className="wild-container">
                <Image src={hero8} width={100} height={100} unoptimized alt='wild-image' />
                <div className="look">
                    <h4>Get the look</h4>
                    <p>Shop now</p>
                </div>
            </div>
        </div>
    )
}
