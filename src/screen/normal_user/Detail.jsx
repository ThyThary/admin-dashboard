import React from "react";
import HomeIcon from "../../icons/svg/Home";
import DetailIcon from "../../icons/svg/Detail";
import { Link } from "react-router-dom";
import Button from "../../style/tailwind/Button";
import DateKhmer from "../../components/DateKhmer";
function Detail() {
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
                / លម្អិត
              </label>
            </Link>
            <div className="flex ml-auto">
              <DateKhmer />
            </div>
          </div>

          <div className="flex flex-row gap-x-2 items-center mt-7">
            <div>
              <DetailIcon name="detail" size="24" color="#2a4f8a" />
            </div>
            <div>
              <label
                className="text-md font-bold pt-1 text-[#2a4f8a] "
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                លម្អិត
              </label>
            </div>
          </div>
        </div>
        <div className=" relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh]">
          <div className="">
            <div className="px-5 py-2">
              <label
                style={{ fontFamily: "Hanuman, sans-serif" }}
                className="font-bold text-lg text-[#2a4f8a]"
              >
                លម្អិតពាក្យ
              </label>
            </div>
            <div className="col-span-2 !border-b-1 border-[#2f7447]"></div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full gap-3 p-5">
              {/* grid one */}
              <div className="mr-2">
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ពាក្យ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ធី ថារី
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ស្ថានភាព
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ថ្មី
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ពាក្យខ្មែរ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ចន្ទគតិកាល
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ថ្នាក់ពាក្យខ្មែរ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    នាមសព្ទ
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    និយមន័យខ្មែរ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    (បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំមួយៗចែកជារដូវមាន
                    ៣ គឺ ហេមន្តៈ រដូវរងា មាន ៤ ខែ រាប់តាំងពីថ្ងៃ ១ រោច​ ខែកត្ដិក
                    ទៅដល់ ថ្ងៃពេញបូណ៌មីខែផល្គុន; គិម្ហៈ រដូវក្ដៅមាន៤ ខែ
                    រាប់ពីថ្ងៃ ១ រោចខែផល្គុន ទៅដល់ថ្ងៃពេញបូណ៌មីខែអាសាឍ; វស្សានៈ។
                  </li>
                </ul>
              </div>
              {/* grid two */}
              <div className="ml-2">
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    កាលបរិច្ឆេទបង្កើត
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ១៣-មីនា-២០២៥
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    កាលបរិច្ឆេទត្រួតពិនិត្យ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ១៣-មីនា-២០២៥
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ពាក្យអង់គ្លេស
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Moul, serif" }}
                  >
                    Lunar calendar
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    ថ្នាក់ពាក្យអង់គ្លេស
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Moul, serif" }}
                  >
                    Noun
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    និយមន័យអង់គ្លេស
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Moul, serif" }}
                  >
                    Any of various systems for measuring the days, weeks, and
                    months of the year that are based on the phases of the moon
                    (= the regular changes in the shape of the moon as it
                    appears to us on earth
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* button */}
          <div className=" absolute  sm:col-span-2 text-end right-5 bottom-5">
            <div className=" flex gap-3">
              <div>
                {" "}
                <Link to="/word-list">
                  <Button color="slate" text="ត្រលប់ក្រោយ" className="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
