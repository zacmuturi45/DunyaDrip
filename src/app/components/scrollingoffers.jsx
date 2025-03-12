import React from 'react'

export default function ScrollingOffers() {
    const offers = [
        "50% off for orders above $70",
        "20% off for veterans",
        "Free shipping for orders over $50",
        "Buy 1 get 1 free on select items"
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
