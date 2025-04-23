import React from "react";

const Home = ({ name, size = 15, color = "#6B7280" }) => {
  const icons = {
    home: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_227_294)">
          <path
            d="M13.2 6.30005V14.7H1.79999V6.30005"
            stroke={color}
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M5.70001 14.7V8.40002H9.30001V14.7"
            stroke={color}
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M10.5 1.5V2.4048L11.1 3.0282V2.1H11.7V3.6609L12.3 4.2798V1.5H10.5Z"
            fill={color}
          />
          <path
            d="M0.333008 7.78262L7.50001 0.315918L14.667 7.78292"
            stroke={color}
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_227_294">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  };
  return icons[name] || <span>Icon not found</span>;
};

export default Home;
