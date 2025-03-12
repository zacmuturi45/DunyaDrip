import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { FlagContext, flag_active } from '../contexts/flagcontext'

export default function FlagBoxes({ image, country, currency, index=null }) {
    const { setApplyLocation, setFlagActive, apply_location, color_index, setColorIndex } = useContext(FlagContext)
    const [active, setActive] = useState(false);
    return (
        <div className="flagbox-component" onClick={() => {
            setFlagActive(true)
            setColorIndex(index)
            setApplyLocation(prevState => ({
                ...prevState,
                flag_image: image,
                country_name: country,
                currency: currency
            }))
        }}
            style={color_index === index ? { backgroundColor: "rgb(154, 255, 255)" } : { backgroundColor: "hsla(0, 0%, 48%, 0.3)" }}
        >
            <Image src={image} width={20} height={20} alt='flag-imge' />
            <p>{`${country} / ${currency}`}</p>
        </div>
    )
}
