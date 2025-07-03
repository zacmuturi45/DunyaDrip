"use client"

import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Image from 'next/image'
import React from 'react'
import { useSort } from '../contexts/sort_context';
import { useRouter } from 'next/navigation';

export default function CollectionCircle({ image, label, index }) {
    const { setExclusiveFilter } = useSort();
    const router = useRouter();

    const handleClick = (item = null, category) => {
        setExclusiveFilter(category, item);
        router.push("/drip");
    };

    return (
        <div className="collection-circles" key={index} onClick={() => handleClick(label, "All")}>
            <div className="circle">
                <Image src={supabse_image_path(`/${image}`)} width={40} height={40} alt='jacket' unoptimized />
            </div>
            <p>{label}</p>
        </div>
    )
}
