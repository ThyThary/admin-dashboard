import React, { useState } from "react";
import UnlockIcon from "../icons/svg/Unlock";
import LogOutIcon from "../icons/svg/LogOut";
import ModalChangePassword from "./ChangePasword";
import Button from "../style/tailwind/Button";

function Profile({ img, name, email, id, position, phone }) {
  const [isModalOpenPWD, setIsModalOpenPWD] = useState(false);
  return (
    <>
      <div>
        <ModalChangePassword
          isOpen={isModalOpenPWD}
          btnNo={
            <Button
              color="red"
              text="បោះបង់"
              onClick={() => setIsModalOpenPWD(false)}
              className="px-2"
            />
          }
          btnOk={<Button color="blue" text="រក្សាទុក" className="px-2" />}
          id={id}
        />
      </div>
      <div className=" absolute z-40 right-3 top-9 ">
        <div className=" relative grid grid-cols-1 border border-[#2f7447] min-h-64 min-w-56 rounded-lg shadow-lg bg-white ">
          <div className="grid m-3 bg-[#D9D9D9] rounded-lg min-h-[10vh] max-h-[15vh]">
            <div className="flex rounded-full justify-center text-center cursor-pointer mt-2">
              <img
                src={img}
                alt="Profile"
                className="h-[7vh] w-[7vh] object-cover ring-1 ring-[#2f7447] rounded-full transition-transform duration-300"
              />
            </div>
            <label
              htmlFor="name"
              className=" text-xs font-bold"
              style={{ fontFamily: "Hanuman, sans-serif" }}
            >
              {name}
            </label>
            <label
              htmlFor="email"
              className=" text-xs"
              style={{ fontFamily: "Moul, serif" }}
            >
              {email}
            </label>
          </div>
          <div className="flex mx-3 mb-7 min-h-[10vh]  max-h-[10vh] text-left">
            <div className="grid grid-cols-1 min-w-16 mr-2">
              <label
                htmlFor=""
                className=" text-xs font-bold"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                លេខសម្គាល់
              </label>
              <label
                htmlFor=""
                className=" text-xs font-bold"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                មុខតំណែង
              </label>
              <label
                htmlFor=""
                className=" text-xs font-bold"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                លេខទូរស័ព្ទ
              </label>
            </div>
            <div className="grid grid-cols-1 text-xs">
              <label
                htmlFor="id"
                className=" text-xs"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                : {id}
              </label>
              <label
                htmlFor="position"
                className=" text-xs"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                : ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​{position}
              </label>
              <label
                htmlFor="phone"
                className=" text-xs"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                : {phone}
              </label>
            </div>
          </div>

          <div className="absolute mx-3 min-h-[2vh] mb-3 bottom-0">
            <div className="flex w-full">
              <div className=" flex items-center gap-x-2">
                <div>
                  <UnlockIcon name="unlock" size="20" color="#6B7280" />
                </div>
                <div>
                  {/* <Link to="/change-password"> */}

                  <button
                    onClick={() => {
                      setIsModalOpenPWD(true);
                    }}
                    // onClick={() => handleId(row.id)}
                    className="text-xs font-bold cursor-pointer hover:text-[#375883]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ប្ដូរពាក្យសម្ងាត់
                  </button>
                  {/* </label> */}
                  {/* </Link> */}
                </div>
              </div>
              <div className=" flex items-center gap-x-2 text-right ml-9">
                <div>
                  <LogOutIcon name="logout" size="20" color="#6B7280" />
                </div>
                <div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("access");
                      window.location.href = "http://localhost:8012/log-in";
                    }}
                    className=" text-xs font-bold cursor-pointer hover:text-[#375883]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ចាកចេញ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
