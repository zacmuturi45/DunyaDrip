"use client";
import React from "react";

const LiquidLoader = () => {
  return (
    <div className="liquid-container">
      <svg viewBox="0 0 300 100" className="liquid-svg">
        <defs>
          <clipPath id="text-clip">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="36" fontWeight="bold">
              Loading...
            </text>
          </clipPath>

          <pattern id="wave" x="0" y="0" width="120" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 0 30 Q 30 10, 60 30 T 120 30 V 100 H 0 Z"
              fill="#4f46e5">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -60,0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#wave)"
          clipPath="url(#text-clip)"
        />
      </svg>
    </div>
  );
};

export default LiquidLoader;
