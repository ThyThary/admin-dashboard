import React from "react";

const Overlay = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/0 flex items-center justify-center z-50 cursor-not-allowed"></div>
  );
};

export default Overlay;
