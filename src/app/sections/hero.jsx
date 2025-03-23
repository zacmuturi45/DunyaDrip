import React from 'react'
import "../css/index.css"
import Image from 'next/image'
import { hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8 } from '../../../public/imports'

export default function Hero() {
  return (
    <div className='hero-main'>
      <Image src={hero3} width={100} height={100} alt='hero-image' unoptimized className='main-hero-image' />
    </div>
  )
}
