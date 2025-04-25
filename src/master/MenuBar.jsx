import { React, lazy } from "react";
const UserIcon = lazy(() => import("../icons/svg/User"));
const CheckIcon = lazy(() => import("../icons/svg/Check"));
const WordIcon = lazy(() => import("../icons/svg/Word"));
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const location = useLocation();
  const textRoute = location.pathname;
  const wordRotue = textRoute.split("-");
  const seperateRoute = wordRotue[1];
  const sidebarRoute = wordRotue[0];

  return (
    <>
      {/* Admin */}
      <div
        className={`grid grid-cols-1 ${
          sidebarRoute !== `/word` ? "" : "hidden"
        } `}
      >
        {/* User Link */}
        <Link
          to="/admin/user-list"
          className={`w-full px-5 mt-2 text-white  ${
            location.pathname === `/admin/user-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <UserIcon name="user" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-3"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                អ្នកប្រើប្រាស់
              </label>
            </div>
          </div>
        </Link>

        {/* Controller */}
        <Link
          to="/admin/controller-list"
          className={`w-full px-5 mt-2 text-white ${
            location.pathname === `/admin/controller-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <CheckIcon name="check" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-3"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                ត្រួតពិនិត្យសំណើ
              </label>
            </div>
          </div>
        </Link>
        {/* word Link */}
        <Link
          to="/admin/word-list"
          className={`w-full px-5 mt-2 text-white  ${
            location.pathname === `/admin/word-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <WordIcon name="word" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-3"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                ពាក្យ
              </label>
            </div>
          </div>
        </Link>
      </div>

      {/* Normal user */}
      <div
        className={`grid grid-cols-1 ${
          sidebarRoute === `/word` ? "" : "hidden"
        } `}
      >
        {/* word Link */}
        <Link
          to="/word-list"
          className={`w-full px-5 mt-2 text-white  ${
            location.pathname === `/word-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <WordIcon name="word" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-3"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                ពាក្យ
              </label>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MenuBar;
