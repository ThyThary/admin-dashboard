import React from "react";
import HomeIcon from "../../icons/svg/Home";
import UnlockIcon from "../../icons/svg/Unlock";
import { Link } from "react-router-dom";
import Input from "../../style/tailwind/Input";
import Button from "../../style/tailwind/Button";

const ChangePassword = () => {
  return (
    <>
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" />
            <Link to="/user-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ប្ដូរពាក្យសម្ងាត់
              </label>
            </Link>
          </div>

          <div className="flex flex-row gap-x-2 items-center mt-7">
            <div>
              <UnlockIcon name="unlock" size="24" color="#2a4f8a" />
            </div>
            <div>
              <label
                className="text-md font-bold pt-1 text-[#2a4f8a] "
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                ប្ដូរពាក្យសម្ងាត់
              </label>
            </div>
          </div>
        </div>
        <div className=" relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh]">
          <div className="p-5 ">
            <div className="flex flex-row justify-center gap-3">
              {/* Sub content  */}
              <div></div>
              <div className="ml-1 basis-1/2">
                <div className="">
                  <Input
                    label="ពាក្យសម្ងាត់បច្ចុប្បន្ន"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="name"
                    name="name"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <Input
                    label="ពាក្យសម្ងាត់ថ្មី"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="phone"
                    name="phone"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <Input
                    label="បញ្ជាក់ពាក្យសម្ងាត់"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="email"
                    name="email"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* button */}
          <div className=" absolute  sm:col-span-2 text-end right-5 bottom-5">
            <div className=" flex gap-3">
              {" "}
              <Link to="/user-list">
                <Button color="red" text="បដិសេធ" className="" />
              </Link>
              <div>
                {" "}
                <Link to="/user-list">
                  <Button color="blue" text="រក្សាទុក" className="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
