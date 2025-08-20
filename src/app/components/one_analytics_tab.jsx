import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Image from 'next/image'
import React from 'react'

export default function OneAnalytics({ title, value, percentage, icon }) {
  return (
    <div className='one_analytics_main'>
        <div className="one_analytics_container">
            <div className='one_p'><p>{title}</p></div>
            <div className='one_icon'>
                <div>{`£${value}`}</div>
                <div>
                    <p>{percentage}</p>
                    <Image src={supabse_image_path(icon)} width={10} height={10} alt='uptick' />
                </div>
            </div>
        </div>
    </div>
  )
}
