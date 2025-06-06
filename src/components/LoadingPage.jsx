import React from "react";
import "../style/css/loading.css";
const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[72vh]">
      <div>
        <span
          style={{
            fontSize: "24px",
            color: "#007bff",
            fontFamily: "Hanuman, sans-serif",
          }}
          className=" flex gap-x-2"
        >
          <span> កំពុងដំណើរការ...</span>
          <span className="loader-wrapper mt-1">
            <div className="spinner !w-5 !h-5"></div>
          </span>
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
