import React from "react";
import HomeIcon from "../../icons/svg/Home";
import CreateIcon from "../../icons/svg/Create";
import { Link } from "react-router-dom";
import Input from "../../style/tailwind/Input";
import Button from "../../style/tailwind/Button";
import TextArea from "../../style/tailwind/TextArea";
import DateKhmer from "../../components/DateKhmer";

function Create() {
  return (
    <>
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" />
            <Link to="/word-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ពាក្យ
              </label>
            </Link>
            <Link to="">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / បង្កើត
              </label>
            </Link>
            <div className="flex ml-auto">
              <DateKhmer />
            </div>
          </div>

          <div className="flex flex-row gap-x-2 items-center mt-7">
            <div>
              <CreateIcon name="create" size="24" color="#2a4f8a" />
            </div>
            <div>
              <label
                className="text-md font-bold pt-1 text-[#2a4f8a] "
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                បង្កើត
              </label>
            </div>
          </div>
        </div>
        <div className=" relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh]">
          <div className="p-5">
            <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full gap-3">
              {/* Sub content one */}
              <div className="mr-1">
                <div className="">
                  <Input
                    label="ពាក្យខ្មែរ"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="user"
                    name="user"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <Input
                    label="ថ្នាក់ពាក្យខ្មែរ"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="email"
                    name="email"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="និយមន័យខ្មែរ"
                    rows="5"
                    classNname=""
                    // value=""
                    // onChange=""
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                  />
                </div>
              </div>
              {/* Sub content two */}
              <div className="ml-1">
                <div className="">
                  <Input
                    label="ពាក្យអង់គ្លេស"
                    text="text"
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
                    label="ថ្នាក់ពាក្យអង់គ្លេស"
                    text="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="phone"
                    name="phone"
                    // value="Testing"
                    // onChange=""
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="និយមន័យអង់គ្លេស"
                    rows="5"
                    classNname=""
                    // value=""
                    // onChange=""
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                  />
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className=" absolute  sm:col-span-2 text-end right-5 bottom-5">
            <div className=" flex gap-3">
              {" "}
              <Link to="/word-list">
                <Button color="red" text="បោះបង់" className="" />
              </Link>
              <div>
                {" "}
                <Link to="/word-list">
                  <Button color="blue" text="រក្សាទុក" className="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Create;
