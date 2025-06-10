import React from 'react'
import "../css/index.css"
import Image from 'next/image'
import supabse_image_path from '@/utils/supabase/supabse_image_path'

export default function Hero() {
  return (
    <div className='hero-main'>
      <Image src={supabse_image_path('/dunya_hero2.jpg')} width={100} height={100} alt='hero-image' unoptimized className='main-hero-image' />
    </div>
  )
}
