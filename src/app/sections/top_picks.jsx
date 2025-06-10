"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import { carl_main, carl_one, carl_two, dark_one, dark_two } from '../../../public/imports'
import { FlagContext } from '../contexts/flagcontext';
import supabse_image_path from '@/utils/supabase/supabse_image_path';

export default function TopPicks({ obsRef }) {
    const { location } = useContext(FlagContext);

    return (
        <div className='main-picks' ref={obsRef}>
            <div className="picks-container">
                <div className="grid">

                    <div className="picks-zero">
                        <h1>Own the Moment. Wear the Wild</h1>
                        <p>Fashion isn&apos;t just what you wear—it&apos;s how you move, how you own every step. Inspired by the raw energy of the streets and the freedom of the wild, this collection is made for those who set trends, not follow them. Ready to make a statement? Let&apos;s go!🔥</p>
                        <div className="butt">
                            <button>Shop now</button>
                        </div>
                    </div>

                    <div className="picks-both">
                        <div className='picks-one'>
                            <Image src={supabse_image_path('/carl_main.jpg')} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                        </div>

                        <div className='picks-two'>

                            <div className="picks-two-cards">
                                <Image src={supabse_image_path('/carl_one.jpg')} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={supabse_image_path('/dark_one.jpg')} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={supabse_image_path('/dark_two.jpg')} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={supabse_image_path('/carl_two.jpg')} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
