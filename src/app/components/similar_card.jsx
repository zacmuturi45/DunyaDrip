"use client"

import Image from "next/image";
// components/ProductCard.jsx
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductCard({ id, image, name, price }) {
    const router = useRouter();

    return (
        <div className="product-card" id="prd_card" onClick={() => router.push(`/${id}`)}>
            <div className="product-card__image">
                <Image src={image} width={100} height={100} unoptimized alt="name" className="img" />
            </div>
            <div className="product-card__info">
                <h3 className="product-card__name">{name}</h3>
                <p className="product-card__price">${price}</p>
            </div>
        </div>
    );
}
