import React from "react";

function Excel({ name, size = 20, color = "#2f7447" }) {
  const icons = {
    excel: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_637_396)">
          <path d="M23.5 3.5H12V20.5H23.5V3.5Z" fill="white" />
          <path
            d="M23.5 21H13.5C13.2236 21 13 20.7764 13 20.5C13 20.2236 13.2236 20 13.5 20H23V4H13.5C13.2236 4 13 3.77637 13 3.5C13 3.22363 13.2236 3 13.5 3H23.5C23.7764 3 24 3.22363 24 3.5V20.5C24 20.7764 23.7764 21 23.5 21Z"
            fill="#177848"
          />
          <path d="M14 0L0 2.6087V21.3913L14 24V0Z" fill="#177848" />
          <path
            opacity="0.2"
            d="M0 2.6087V2.8587L14 0.25V0L0 2.6087Z"
            fill="white"
          />
          <path d="M17 5H13V7H17V5Z" fill="#177848" />
          <path d="M22 5H18V7H22V5Z" fill="#177848" />
          <path d="M17 8H13V10H17V8Z" fill="#177848" />
          <path d="M22 8H18V10H22V8Z" fill="#177848" />
          <path d="M17 11H13V13H17V11Z" fill="#177848" />
          <path d="M22 11H18V13H22V11Z" fill="#177848" />
          <path d="M17 14H13V16H17V14Z" fill="#177848" />
          <path d="M22 14H18V16H22V14Z" fill="#177848" />
          <path d="M17 17H13V19H17V17Z" fill="#177848" />
          <path d="M22 17H18V19H22V17Z" fill="#177848" />
          <path
            opacity="0.1"
            d="M0 21.3913L14 24V23.75L0 21.1413V21.3913Z"
            fill="black"
          />
          <path
            d="M23.5 21C23.7764 21 24 20.7764 24 20.5V13L14 3V21H23.5Z"
            fill="url(#paint0_linear_637_396)"
          />
          <path
            d="M7.35773 12.5L9.65533 8.36426L9.62634 8.34814L7.8797 8.4729L6.50006 10.9562L5.22571 8.66248L3.57593 8.78027L5.6424 12.5L3.57593 16.2197L5.22571 16.3375L6.50006 14.0438L7.8797 16.5271L9.62634 16.6519L9.65533 16.6357L7.35773 12.5Z"
            fill="white"
          />
          <path
            opacity="0.05"
            d="M14 0L0 2.6087V21.3913L14 24V0Z"
            fill="url(#paint1_linear_637_396)"
          />
          <path
            d="M23.5 3H14V0L0 2.6087V21.3913L14 24V21H23.5C23.7764 21 24 20.7764 24 20.5V3.5C24 3.22363 23.7764 3 23.5 3Z"
            fill="url(#paint2_linear_637_396)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_637_396"
            x1="9.5"
            y1="7.5"
            x2="23.3536"
            y2="21.3536"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0.1" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_637_396"
            x1="-0.000815525"
            y1="11.9995"
            x2="14"
            y2="11.9995"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_637_396"
            x1="-1.56345"
            y1="5.96153"
            x2="25.0454"
            y2="18.3694"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_637_396">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  };
  return icons[name] || <span>Icon not found</span>;
}

export default Excel;
