import React from "react";

function Button({ text, onClick, color = "#2a4f8a", className }) {
  const colorClasses = {
    blue: "bg-[#2a4f8a] hover:bg-blue-950 text-white",
    red: "bg-red-700 hover:bg-red-800 text-white",
    slate: "bg-slate-300 hover:bg-gray-400 !text-black",
  };
  return (
    <button
      onClick={onClick}
      className={`${className} px-2 py-1.5 text-white rounded-lg shadow-lg transition-all !cursor-pointer font-[Moul, serif] tracking-[2px] text-md font-normal  ${colorClasses[color]}`}
      style={{ fontFamily: "Hanuman, sans-serif" }}
    >
      {text}
    </button>
  );
}

export default Button;
