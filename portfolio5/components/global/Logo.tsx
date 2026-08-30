import React from "react";

function Logo({ className = "", width = 60, height = 60, letter = "N" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 909 909"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M606.798 163C365.063 327.215 153.824 466.5 174.386 541C205.299 653 698 283 750.386 385C791.988 466 243.5 769.5 243.5 769.5"
        stroke="#00c7ff"
        strokeWidth="50"
      />
      <circle cx="667.298" cy="122" r="25" fill="#00c7ff" />
      <circle cx="605.298" cy="164" r="25" fill="#00c7ff" />
      <circle cx="243" cy="769.78" r="25" fill="#00c7ff" />
      <circle cx="181" cy="812" r="25" fill="#00c7ff" />
      <circle cx="463" cy="441" r="250" fill="white" />
      <path
        d="M175 541.991C205.913 653.991 698.613 283.991 751 385.991"
        stroke="#00c7ff"
        strokeWidth="50"
      />
      <text
        x="463"
        y="560"
        fontSize="340"
        fontFamily="sans-serif"
        fontWeight="900"
        textAnchor="middle"
        fill="black"
      >
        {letter.toUpperCase()}
      </text>
    </svg>
  );
}

export default Logo;
