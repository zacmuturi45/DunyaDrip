import React from 'react'
import { white1 } from '../../../public/imports'
import Image from 'next/image'
import supabse_image_path from '@/utils/supabase/supabse_image_path'

export default function SuccessCard({ identifier, cart_item_title, cart_item_size, cart_item_quantity, cart_item_price }) {
  return (
    <div className='success_product_main' key={identifier}>
    <div className="success_product_div">
        <Image src={supabse_image_path('/white1.webp')} width={100} height={100} alt='cart_image'/>
    </div>

    <div className="success_product_details">
        <h4>{cart_item_title} {`(x${cart_item_quantity})`}</h4>
        <p>{cart_item_price}</p>
        <p>Size: <span>{cart_item_size}</span></p>

        {/* <div className="qtty">
            <p>{cart_item_quantity}</p>
        </div> */}
    </div>

</div>
  )
}