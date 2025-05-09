import React from 'react'

export default function Dunya_Video() {
    return (
        <div className='dunya_video-main'>
            <div className="dunya_video-container">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/dunya.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
