import React from "react";

interface SvgProps {
  background?: string;
  width?: number;
  height?: number;
}

export default function Navsvg({ background = "#f000000", width = 14, height = 14 }: SvgProps) {
  return (
    <>
      <svg
        viewBox="0 0 16 16"
        fill={background}
        width={width}
        height={height}
        style={{ marginTop: "4px" }}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <g id="layer1" transform="rotate(45 1254.793 524.438)">
            <path
              fill="#373737"
              fillOpacity={1}
              fillRule="evenodd"
              stroke="none"
              strokeWidth="1px"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity={1}
              d="M.536 1044.409v-1.997h9v-9h2v11z"
              id="path4179"
            />
          </g>
        </g>
      </svg>
    </>
  );
}
