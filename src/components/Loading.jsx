import React from "react";
import "../style/css/loading.css";
function Loading({ isloading }) {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;
