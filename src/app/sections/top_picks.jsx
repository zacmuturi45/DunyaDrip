"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import { carl_main, carl_one, carl_two, dark_one, dark_two } from '../../../public/imports'
import { FlagContext } from '../contexts/flagcontext';

export default function TopPicks() {
    const { location } = useContext(FlagContext);

    return (
        <div className='main-picks'>
            <div className="picks-container">
                <div className="grid">

                    <div className="picks-zero">
                        <h1>Explore the campaign</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius exercitationem repellendus reiciendis optio facere est tempore deleniti quis quidem unde nemo ducimus nobis explicabo suscipit illum, nulla dolor ut dicta assumenda veritatis commodi ipsum quam? Minima nam ipsa voluptatum.</p>
                        <div className="butt">
                        <button>Shop now</button>
                        </div>
                    </div>

                    <div className="picks-both">
                        <div className='picks-one'>
                            <Image src={carl_main} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                        </div>

                        <div className='picks-two'>

                            <div className="picks-two-cards">
                                <Image src={carl_one} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={dark_one} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={dark_two} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                            <div className="picks-two-cards">
                                <Image src={carl_two} width={100} height={100} alt='carl_main' unoptimized className='carl_main' />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
