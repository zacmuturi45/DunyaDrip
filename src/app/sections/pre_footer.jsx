import Link from 'next/link'
import React from 'react'

export default function PreFooter() {
  return (
    <div className='pre_footer_main'>
        <div className="pre_footer_container">
            <Link href={"/our_story"} className='next-link'><p><span>01•</span>Our Story</p></Link>
            <p><span>02•</span>Size Guide</p>
            <p><span>03•</span>Free returns</p>
        </div>
    </div>
  )
}
