import React from "react";

function Input({
  label,
  type = "text",
  placeholder,
  id,
  name,
  value,
  onChange,
  star, //true/false
  classNname = "w-full",
  disabled,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className=" text-sm font-medium text-gray-700"
          style={{ fontFamily: "Hanuman, sans-serif", fontSize: "16px" }}
        >
          {label}
          {star == "true" ? <span className="text-red-500"> *</span> : ""}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={{ fontFamily: "Hanuman, sans-serif", fontSize: "12px" }}
        className={`${
          disabled == "true"
            ? "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
            : "hover:border-blue-500"
        } px-2 py-2 border border-[#2f7447] rounded-lg focus:outline-none hover:border-1   ${classNname}`}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
