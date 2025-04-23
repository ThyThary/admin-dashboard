import React from "react";
import WarningIcon from "../icons/svg/Warning";
import Delete from "../components/Delete";
const Modal = ({ isOpen, btnNo, btnOk, id }) => {
  // console.log(id);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-[#2f7447]">
        <div className=" flex justify-center">
          <p
            className="text-gray-600 font-bold"
            style={{
              fontFamily: "Hanuman, sans-serif",
              fontSize: "25px",
              color: "#2a4f8a",
            }}
          >
            តើអ្នកប្រាកដទេ?
          </p>
        </div>
        <div className=" flex justify-center items-center min-h-25 max-h-25">
          <WarningIcon name="warning" size="45" color="" />
        </div>
        <div className="flex w-full gap-3 justify-center">
          {" "}
          <div>{btnNo}</div>
          <button onClick={() => Delete(id)}>
            <div>{btnOk}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
