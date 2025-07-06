import Link from 'next/link'
import React from 'react'

export default function PreFooter() {
  return (
    <div className='pre_footer_main'>
      <div className="pre_footer_container">
        <Link href={"/our_story"} className='next-link'><p><span>01•</span>Our Story</p></Link>
        <a href='https://www.spocket.co/blogs/uk-to-us-size-conversion-guide?srsltid=AfmBOootv1brqzwvIMXwOZRTrP8fINfNQomqtY3xLNdd5p-jHyvPRDoe' target='_blank' rel='noopener noreferrer' style={{textDecoration: "none", color: "black"}}><p><span>02•</span>Size Guide</p></a>
        <Link href={"/orders_returns"} className='next-link'><p><span>01•</span>Orders & Returns</p></Link>
      </div>
    </div>
  )
}
