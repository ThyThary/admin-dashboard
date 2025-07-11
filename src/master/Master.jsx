import React, { useState, useRef, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo/logo-fmis-3d-for-web-1.png";
import profileDefault from "../assets/profile/profile-default.jpg";
import { ToastContainer } from "react-toastify";

const MenuIcon = lazy(() => import("../icons/svg/Menu"));
const MenuBar = lazy(() => import("./MenuBar"));
//Calendar component
const Calendar = lazy(() => import("../screen/home/Calendar"));
// User component
const UserList = lazy(() => import("../screen/admin/user/List"));
const UserCreate = lazy(() => import("../screen/admin/user/Create"));
const UserEdit = lazy(() => import("../screen/admin/user/Edit"));
const UserDetail = lazy(() => import("../screen/admin/user/Detail"));
// Word component
const AdminWordList = lazy(() => import("../screen/admin/word/List"));
const AdminWordCreate = lazy(() => import("../screen/admin/word/Create"));
const AdminWordEdit = lazy(() => import("../screen/admin/word/Edit"));
const AdminWordDetail = lazy(() => import("../screen/admin/word/Detail"));
// Controller component
const ControllerList = lazy(() => import("../screen/admin/controller/List"));
const ControllerDetail = lazy(() =>
  import("../screen/admin/controller/Detail")
);
// Word component
const WordList = lazy(() => import("../screen/user/List"));
const WordCreate = lazy(() => import("../screen/user/Create"));
const WordEdit = lazy(() => import("../screen/user/Edit"));
const WordDetail = lazy(() => import("../screen/user/Detail"));
//Dictionary component
const DictionaryList = lazy(() => import("../screen/admin/dictionary/List"));
const DictionaryDetail = lazy(() =>
  import("../screen/admin/dictionary/Detail")
);
const DictionaryEdit = lazy(() => import("../screen/admin/dictionary/Edit"));
//Comment component
const CommentList = lazy(() => import("../screen/admin/comment/List"));
const Profile = lazy(() => import("../components/Profile"));

const user = JSON.parse(localStorage.getItem("user"));

const Master = ({ color = "#2a4f8a" }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Custome route
  const location = useLocation();
  const route = location.pathname;
  const routeSplite = route.split("/");
  const routeId = routeSplite[routeSplite.length - 1];

  // Function to close profile when clicking outside
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className={` flex flex-cols-2 h-full `}>
        <div
          className={` max-w-56 min-w-56 min-h-screen transform transition-all duration-300 ease-in-out bg-[${color}] ${
            sidebarOpen ? "hidden" : ""
          } `}
        >
          <div className="w-full min-h-[11.111vh]">
            <div className="flex w-full justify-center  p-3">
              <img src={logo} alt="Logo" width={204} height={120} />
            </div>
            <div className=" border border-b-white shadow-lg mb-3"></div>
            {/* Menu bar */}
            <MenuBar />
          </div>
        </div>
        <div className=" w-full flex-col bg-[#e5e7eb]">
          <div>
            <div className="flex h-10 items-center justify-center text-center bg-white shadow-md">
              <div className="items-center m-1">
                <button
                  className={`p-1 hover:scale-110 transition cursor-pointer ${
                    sidebarOpen ? "border border-[#2f7447] rounded-md ml-4" : ""
                  } `}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <MenuIcon name="menu" size="20" color="#6B7280" />
                </button>
              </div>
              <div></div>
              <div ref={profileRef} className=" relative w-full  h-10">
                {showProfile && (
                  <Profile
                    img={profileDefault || profileDefault}
                    name={user?.username_kh || ""}
                    email={user?.email || ""}
                    id={user?.staff_id || ""}
                    position={user?.position || ""}
                    phone={user?.phone_number || ""}
                  />
                )}
                <div className="absolute right-14 top-1.5 h-[5vh]">
                  <label
                    className=" text-md"
                    htmlFor=""
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      color: "#2a4f8a",
                    }}
                  >
                    {user?.username_kh || ""}
                  </label>
                </div>
                {/* Toggle Button Show/Hide*/}
                <button onClick={() => setShowProfile(!showProfile)}>
                  <div className="absolute rounded-full border-0 right-3 top-1.5 cursor-pointer h-7 w-7">
                    <img
                      src={profileDefault || profileDefault}
                      alt="Profile"
                      className="h-7 w-7 object-cover rounded-full transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* User route */}
          {route === "/admin/home" && (
            <div className=" h-auto">
              <Calendar />
            </div>
          )}
          {/* User route */}
          {route === "/admin/user-list" && (
            <div className=" h-auto">
              <UserList />
            </div>
          )}
          {route === "/admin/user-create" && (
            <div className=" h-auto">
              <UserCreate />
            </div>
          )}
          {route === `/admin/user-edit/${routeId}` && (
            <div className=" h-auto">
              <UserEdit />
            </div>
          )}
          {route === `/admin/user-detail/${routeId}` && (
            <div className=" h-auto">
              <UserDetail />
            </div>
          )}
          {/* Contoller route */}
          {route === "/admin/controller-list" && (
            <div className="h-auto">
              <ControllerList />
            </div>
          )}
          {route === `/admin/controller-detail/${routeId}` && (
            <div className=" h-auto">
              <ControllerDetail />
            </div>
          )}
          {/* Admin Word routes */}
          {route === "/admin/word-list" && (
            <div className=" h-auto">
              <AdminWordList />
            </div>
          )}
          {route === "/admin/word-create" && (
            <div className=" h-auto">
              <AdminWordCreate />
            </div>
          )}
          {route === `/admin/word-edit/${routeId}` && (
            <div className=" h-auto">
              <AdminWordEdit />
            </div>
          )}
          {route === `/admin/word-detail/${routeId}` && (
            <div className=" h-auto">
              <AdminWordDetail />
            </div>
          )}
          {/* Admin Dictionary routes */}
          {route === "/admin/dictionary-list" && (
            <div className=" h-auto">
              <DictionaryList />
            </div>
          )}
          {route === `/admin/dictionary-detail/${routeId}` && (
            <div className=" h-auto">
              <DictionaryDetail />
            </div>
          )}
          {route === `/admin/dictionary-edit/${routeId}` && (
            <div className=" h-auto">
              <DictionaryEdit />
            </div>
          )}
          {/* Admin Comment routes */}
          {route === "/admin/comment-list" && (
            <div className=" h-auto">
              <CommentList />
            </div>
          )}
          {/* Normal user */}
          {/* Word routes */}
          {route === "/user/word-list" && (
            <div className=" h-auto">
              <WordList />
            </div>
          )}
          {route === "/user/word-create" && (
            <div className=" h-auto">
              <WordCreate />
            </div>
          )}
          {route === `/user/word-edit/${routeId}` && (
            <div className=" h-auto">
              <WordEdit />
            </div>
          )}
          {route === `/user/word-detail/${routeId}` && (
            <div className=" h-auto">
              <WordDetail />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Master;
