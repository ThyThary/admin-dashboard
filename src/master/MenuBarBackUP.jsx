import React, { useState, useEffect, lazy } from "react";
const UserIcon = lazy(() => import("../icons/svg/User"));
const CheckIcon = lazy(() => import("../icons/svg/Check"));
const WordIcon = lazy(() => import("../icons/svg/Word"));
const DictionaryIcon = lazy(() => import("../icons/svg/Dictionary"));
const CommentIcon = lazy(() => import("../icons/svg/Comment"));
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const location = useLocation();
  const textRoute = location.pathname;
  const wordRotue = textRoute.split("-");
  const seperateRoute = wordRotue[1];
  const sidebarRoute = wordRotue[0];
  const [activeTab, setActiveTab] = useState("FMIS Admin Dictionary ");
  useEffect(() => {
    // Update browser tab title
    document.title = activeTab;
  }, [activeTab]);
  return (
    <>
      {/* Admin */}
      <div
        className={`grid grid-cols-1 ${
          sidebarRoute !== `/user/word` ? "" : "hidden"
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
          onClick={() => {
            setActiveTab("Admin User");
          }}
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
          onClick={() => {
            setActiveTab("Admin Controller");
          }}
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
          onClick={() => {
            setActiveTab("Admin Word");
          }}
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
        {/* Dictionary Link */}
        <Link
          to="/admin/dictionary-list"
          className={`w-full pr-5 pl-4 mt-2 text-white  ${
            location.pathname === `/admin/dictionary-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
          onClick={() => {
            setActiveTab("Admin Dictionary");
          }}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <DictionaryIcon name="dictionary" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-2"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                វចនានុក្រម
              </label>
            </div>
          </div>
        </Link>
        {/* Comment Link */}
        <Link
          to="/admin/comment-list"
          className={`w-full px-5 mt-2 text-white  ${
            location.pathname === `/admin/comment-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
          onClick={() => {
            setActiveTab("Admin Comment");
          }}
        >
          <div className=" flex w-full cursor-pointer py-1 hover:scale-110">
            <div className="mt-0.5 ">
              {" "}
              <CommentIcon name="comment" size="18" color="white" />
            </div>
            <div>
              <label
                className=" text-md ml-3"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                មតិយោបល់
              </label>
            </div>
          </div>
        </Link>
      </div>

      {/* Normal user */}
      <div
        className={`grid grid-cols-1 ${
          sidebarRoute === `/user/word` ? "" : "hidden"
        } `}
      >
        {/* word Link */}
        <Link
          to="/user/word-list"
          className={`w-full px-5 mt-2 text-white  ${
            location.pathname === `/user/word-${seperateRoute}`
              ? "bg-teal-700 shadow-md"
              : " hover:bg-blue-950"
          }`}
          onClick={() => {
            setActiveTab("User Word");
          }}
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
