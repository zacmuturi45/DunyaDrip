import Image from 'next/image'
import React from 'react'
import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Link from 'next/link'

export default function Wild() {
    return (
        <div className='wild-main'>
            <div className="wild-container">
                <Image src={supabse_image_path('/dunya_hero8.jpg')} width={100} height={100} unoptimized alt='wild-image' />
                <div className="look">
                    <h4>Get the look</h4>
                    <Link href={"/drip"} className='next-link'><p>Shop now</p></Link>
                </div>
            </div>
        </div>
    )
}
