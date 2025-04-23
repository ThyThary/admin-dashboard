import React from "react";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows,
  classNname,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-sm font-medium text-gray-700"
          style={{ fontFamily: "Hanuman, sans-serif", fontSize: "16px" }}
        >
          {label}
        </label>
      )}
      <textarea
        className={`px-2 py-2 border border-[#2f7447] rounded-lg focus:outline-none hover:border-1 hover:border-blue-500  ${classNname}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
