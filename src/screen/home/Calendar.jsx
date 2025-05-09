import React, { useState, lazy } from "react";
import CalendarList from "react-calendar";
import { Link } from "react-router-dom";
import DateKhmer from "../../components/DateKhmer";
const HomeIcon = lazy(() => import("../../icons/svg/Home"));
const ListIcon = lazy(() => import("../../icons/svg/List"));
// import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" color="#6B7280" />
            <Link to="">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ប្រតិទិន
              </label>
            </Link>

            <div className="hidden sm:block ml-auto">
              {" "}
              <DateKhmer />
            </div>
          </div>

          <div className="flex flex-row gap-x-2 items-center mt-5">
            <div>
              <ListIcon name="list" size="" color="" />
            </div>
            <div>
              <label
                className="text-md font-bold pt-1 text-[#2a4f8a] "
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                ប្រតិទិន
              </label>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className=" bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="px-5 pt-5">
            <div
              className="pb-5 flex !w-full"
              style={{ fontFamily: "Moul,serif" }}
            >
              <CalendarList onChange={setDate} value={date} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
