import React from "react";
import Loading from "../../components/Loading";

function Button({
  text,
  onClick,
  color = "blue", // use the key from colorClasses
  className = "",
  isLoading = false,
  disabled = false,
}) {
  const colorClasses = {
    blue: "bg-[#2a4f8a] hover:bg-blue-950 text-white",
    red: "bg-red-700 hover:bg-red-800 text-white",
    slate: "bg-slate-300 hover:bg-gray-400 !text-black",
    green: "bg-[#00ba98] hover:bg-emerald-600 !text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer px-2 py-1.5 rounded-lg shadow-lg transition-all font-[Moul, serif] tracking-[2px] text-md font-normal
        ${
          isLoading
            ? "disabled:cursor-not-allowed bg-blue-300 text-white"
            : colorClasses[color]
        }
      `}
      style={{ fontFamily: "Hanuman, sans-serif" }}
      disabled={disabled}
    >
      <span className="flex items-center gap-x-2 text-md">
        {isLoading && <Loading />}
        {text}
      </span>
    </button>
  );
}

export default Button;
