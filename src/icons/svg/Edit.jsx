import React from "react";

const Edit = ({ name, size = 20, color = "" }) => {
  const icons = {
    edit: (
      <div className="cursor-pointer">
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8233 1.67664L18.3233 4.17664L16.4175 6.0833L13.9175 3.5833L15.8233 1.67664ZM6.66663 13.3333H9.16663L15.2391 7.2608L12.7391 4.7608L6.66663 10.8333V13.3333Z"
            fill="#059669"
          />
          <path
            d="M15.8333 15.8333H6.79833C6.77667 15.8333 6.75417 15.8417 6.7325 15.8417C6.705 15.8417 6.6775 15.8342 6.64917 15.8333H4.16667V4.16667H9.8725L11.5392 2.5H4.16667C3.2475 2.5 2.5 3.24667 2.5 4.16667V15.8333C2.5 16.7533 3.2475 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V8.61L15.8333 10.2767V15.8333Z"
            fill="#059669"
          />
        </svg>
      </div>
    ),
  };
  return icons[name] || <span>Icon not found</span>;
};

export default Edit;
