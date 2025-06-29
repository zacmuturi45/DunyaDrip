import React from 'react'

export default function ScrollingOffers() {
    const offers = [
        "10% off your first order",
        "Free shipping over £50",
        "Summer Drip Sale - Up to 30% Off Selected Items",
        "Student Discount - 15% off"
    ];
    return (
        <div className='offer-track'>
            {
                offers.map((item, index) => (
                    <span key={index} className='offer-item'>
                        {item} &nbsp; • &nbsp;
                    </span>
                ))
            }
            {
                offers.map((offer, index) => (
                    <span key={`duplicate-${index}`} className='offer-item'>
                        {offer} &nbsp; • &nbsp;
                    </span>
                ))
            }
        </div>
    )
}
