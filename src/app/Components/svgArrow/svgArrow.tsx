import React from "react";

interface SvgArrowProps {
  fillColor?: string;
  width?: number;
  height?: number;
}

export default function SvgArrow({
  fillColor = "#000000",
  width = 24,
  height = 24,
}: SvgArrowProps) {
  return (
    <div>
      <svg
        viewBox="0 0 1024 1024"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor}
        width={width}
        height={height}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M705.6 376.2L512 569.8 318.5 376.2 266.7 428 512 673.2 757.3 428z"
            fill="#0F1F3C"
          ></path>
        </g>
      </svg>
    </div>
  );
}
