import React from "react";
import "../style/css/loading.css";
export default function LoadingTable() {
  return (
    <>
      <div className="flex justify-center items-center text-center">
        <div>
          <span
            style={{
              fontSize: "13px",
              color: "#007bff",
              fontFamily: "Hanuman, sans-serif",
            }}
            className=" flex gap-x-2"
          >
            <span> កំពុងដំណើរការ...</span>
            <span className="loader-wrapper mt-0.5">
              <div className="spinner"></div>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
