import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Image from 'next/image'
import React from 'react'

export default function OurStory() {
    return (
        <div className='story-main'>
            <div className="story-container">

                <div className='story_one'>
                    {/* <div className="img">
                        <Image src={supabse_image_path("/dunya14.jpeg")} width={100} height={100} alt='dunya_image' unoptimized />
                    </div> */}

                </div>

                <div className='story_two'>
                    <h2>This is Dunya Drip</h2>
                    <div className="text">
                        <p>Dunya Drip was born from a vision: to celebrate culture and identity through streetwear. We started with a few bold pieces and a big dream — to let people wear their roots with pride. Whether you&apos;re repping Kenya, Ghana, or the diaspora at large, our drip speaks your language.</p>
                    </div>
                </div>

                <div className='story_three'>
                    <div className="story_three_container">
                        <div className='three_img'><Image src={supabse_image_path("/dunya16.jpeg")} width={100} height={100} alt='dunya_model' className='three' unoptimized /></div>
                        <div className="text_container">
                            <div className="three_text_container">
                                <div className='three_text'>
                                    <h3>🧵 Set Yourself Apart ~ Wear Your Identity, Not Just a Trend
                                    </h3>
                                    <p>At Dunya Drip, we don&apos;t chase hype — we craft culture. Every design is rooted in pride, heritage, and the rhythm of the streets. Whether it&apos;s your national flag reimagined on a sleek puffer jacket or your roots stitched into a hoodie, we make clothing that speaks louder than logos. You&apos;re not just wearing a fit — you&apos;re repping where you&apos;re from and who you are.</p>

                                    <p>We blend bold design with meaning, creating limited pieces that spark conversation and connection. Our collections celebrate individuality, culture, and community — because style should say something. Dunya Drip isn&apos;t just about fashion. It&apos;s about making sure that wherever you walk, your story walks with you.</p>
                                </div>

                                <div className='three_text'>
                                    <h3>🌍 Drip Beyond Borders</h3>
                                    <p>We&apos;re more than just a clothing brand — we&apos;re a global movement. From Nairobi to London, Accra to Atlanta, Dunya Drip bridges cultures through fashion. Our designs speak the universal language of pride, identity, and unapologetic self-expression.</p>

                                    <p>Every piece you wear connects you to a larger community — one that celebrates diversity, roots, and rhythm. Because wherever you are, your culture deserves to shine.</p>
                                </div>
                            </div>

                            <div className="more_text">
                                <h2>🔥 Built for the Bold</h2>

                                <div className="text">
                                    <p>Dunya Drip is made for the ones who stand out, speak up, and wear their truth. We don&apos;t follow fast fashion — we design with intention. From quality materials to meaningful details, everything we drop is made to last, made to spark pride, and made to tell your story.</p>
                                    <p>So whether you're stepping into the city or into your purpose, do it in drip that represents you. Bold. Authentic. Limitless.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
