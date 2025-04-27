"use client"

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { FlagContext } from '../contexts/flagcontext'
import { useRouter } from 'next/navigation';

export default function Featured_Card({ image, image2, product_name, product_price, index, id }) {
    const { location } = useContext(FlagContext);
    const [which_image, setWhichImage] = useState("image1")
    const router = useRouter();

    return (
        <div className='featured_card_main' key={index} onClick={() => router.push(`/${id}`)} >
            <div className="card-img">
                <Image src={image} width={100} height={100} alt='card-image' placeholder='blur' blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkICwoIDAwMDw4FBAwODx4QEBAQEBAQEB8QEBAQEBAwMEBw8MGBYMGxkYGx4ZGRkbGxMfGhgkHiEfGhMjHf/2wBDAQwQECA8REhIQFR8UEh8aGBoZGRksHhAfHxIQFhwlGx1JHxMeJx4o/2wBDAQwMGBgZGx1LHB4eHj9AICAgKj9ZLF0pPEh2jIGYvMtAHFzAC9By0V1P/9oADAMBAAIAE0t7D/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBxIhEzFhM2H/8QAtIEAAEDAwIEBAQDBAcAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwQF/8QAJhEBAAIBAgQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/9oADAMBAAIAAwEAAhJ6zmS9JlhYcuIggfK95iGjAo9p9rDe0f7vVxDYMw8p9h7sGbfJLRhP8aegwWql6c7QJ5mjtk2UMfg3mf5WiAvqMtGZsSbh0fCmL9XKbR1Tz/8QAHwEAAwECAwQDBAcEAgQEBQAAAwQBBQYREgASITFBEyJRobHBCxLB4SIQ8eH/2gAIAQAA/8QAGAEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAtIEAAEDAwIEAwQDBAcAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/9oADAMBAAIAAwEAAhJ6zmS9JlhYcuIggfK95iGjAo9p9rDe0f7vVxDYMw8p9h7sGbfJLRhP8aegwWql6c7QJ5mjtk2UMfg3mf5WiAvqMtGZsSbh0fCmL9XKbR1Tz"
                    unoptimized className={which_image === "image1" ? "card-img1 card-z-index" : "card-img1"} />
                <Image src={image2} width={100} height={100} alt='card-image' placeholder='blur' blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkICwoIDAwMDw4FBAwODx4QEBAQEBAQEB8QEBAQEBAwMEBw8MGBYMGxkYGx4ZGRkbGxMfGhgkHiEfGhMjHf/2wBDAQwQECA8REhIQFR8UEh8aGBoZGRksHhAfHxIQFhwlGx1JHxMeJx4o/2wBDAQwMGBgZGx1LHB4eHj9AICAgKj9ZLF0pPEh2jIGYvMtAHFzAC9By0V1P/9oADAMBAAIAE0t7D/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBxIhEzFhM2H/8QAtIEAAEDAwIEBAQDBAcAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwQF/8QAJhEBAAIBAgQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/9oADAMBAAIAAwEAAhJ6zmS9JlhYcuIggfK95iGjAo9p9rDe0f7vVxDYMw8p9h7sGbfJLRhP8aegwWql6c7QJ5mjtk2UMfg3mf5WiAvqMtGZsSbh0fCmL9XKbR1Tz/8QAHwEAAwECAwQDBAcEAgQEBQAAAwQBBQYREgASITFBEyJRobHBCxLB4SIQ8eH/2gAIAQAA/8QAGAEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAtIEAAEDAwIEAwQDBAcAAQJ3AAECAxEEBSExBhJBUQdhIhMiMoEIFEKRobHBCxLB4SJC/9oADAMBAAIAAwEAAhJ6zmS9JlhYcuIggfK95iGjAo9p9rDe0f7vVxDYMw8p9h7sGbfJLRhP8aegwWql6c7QJ5mjtk2UMfg3mf5WiAvqMtGZsSbh0fCmL9XKbR1Tz"
                    unoptimized className={which_image === "image2" ? "card-img2 card-z-index" : "card-img2"} />
            </div>
            <div className="card-content">
                <div className="card-circle">
                    <div className={which_image === "image1" ? "black-circle" : "circle-div"} onClick={() => setWhichImage("image1")}><Image src={image} width={20} height={20} alt='image-2' className='card-circle-img' unoptimized /></div>
                    <div className={which_image === "image2" ? "black-circle" : "circle-div"} onClick={() => setWhichImage("image2")} ><Image src={image2} width={20} height={20} alt='image-2' className='card-circle-img' unoptimized /></div>
                </div>
                <p>{product_name}</p>
                <p><span>{location.currency}</span>{product_price}</p>
            </div>
        </div>
    )
}
