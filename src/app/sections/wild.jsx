import Image from 'next/image'
import React from 'react'
import supabse_image_path from '@/utils/supabase/supabse_image_path'

export default function Wild() {
    return (
        <div className='wild-main'>
            <div className="wild-container">
                <Image src={supabse_image_path('/dunya_hero8.jpg')} width={100} height={100} unoptimized alt='wild-image' />
                <div className="look">
                    <h4>Get the look</h4>
                    <p>Shop now</p>
                </div>
            </div>
        </div>
    )
}
