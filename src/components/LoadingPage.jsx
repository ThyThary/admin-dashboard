import React from "react";
const LoadingPage = () => {
  return (
    <div className=" flex justify-center items-center min-h-[50vh]">
      <div style={{ padding: "24px", textAlign: "center" }}>
        <span
          style={{
            fontSize: "24px",
            color: "#007bff",
            fontFamily: "Hanuman, sans-serif",
          }}
        >
          កំពុងដំណើរការ... 🔄
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
