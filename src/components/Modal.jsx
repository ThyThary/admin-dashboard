import React, { useState } from "react";
import WarningIcon from "../icons/svg/Warning";
import Delete from "../components/Delete";
import Button from "../style/tailwind/Button";
import Overlay from "../components/Overlay";

const Modal = ({
  isOpen,
  btnNo,
  routeWeb,
  routeAPI,
  routeAPIType,
  id,
  text,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <Overlay isOpen={isOverlay} />
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
            <div>
              <Button
                color="blue"
                text="បាទ"
                className="px-3"
                onClick={(e) => {
                  Delete(
                    routeWeb,
                    routeAPIType,
                    routeAPI,
                    id,
                    text,
                    setIsLoading,
                    setIsOverlay
                  );
                }}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
