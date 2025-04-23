import React from "react";

const Warning = ({ name, size = 40, color = "white" }) => {
  const icons = {
    warning: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 27C18.1826 27 21.2348 25.7357 23.4853 23.4853C25.7357 21.2348 27 18.1826 27 15C27 11.8174 25.7357 8.76516 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3C11.8174 3 8.76516 4.26428 6.51472 6.51472C4.26428 8.76516 3 11.8174 3 15C3 18.1826 4.26428 21.2348 6.51472 23.4853C8.76516 25.7357 11.8174 27 15 27ZM15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM13.5 21H16.5V24H13.5V21ZM13.5 6H16.5V18H13.5V6Z"
          fill="#FDBA74"
        />
      </svg>
    ),
  };
  return icons[name] || <span>Icon not found</span>;
};

export default Warning;
