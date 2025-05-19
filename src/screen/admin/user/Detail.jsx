import React, { useState, useEffect } from "react";
import HomeIcon from "../../../icons/svg/Home";
import DetailIcon from "../../../icons/svg/Detail";
import { Link, useParams } from "react-router-dom";
import Button from "../../../style/tailwind/Button";
import DateKhmer from "../../../components/DateKhmer";
import api from "../../../config/api";
import ModalReject from "../controller/ModalReject";
import Modal from "../../../components/Modal";
export default function Detail() {
  // Get user id
  const { id } = useParams();
  const [user, setUser] = useState();
  const userLog = JSON.parse(localStorage.getItem("user"));
  const [isModalReject, setIsModalReject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get(`/api/users/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      })
      .then((res) => {
        console.log("Get data: ", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        // setPending(false);
      });
  }, []);
  if (!user)
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <span
          style={{
            fontSize: "24px",
            color: "#007bff",
            fontFamily: "Hanuman, sans-serif",
          }}
        >
          កំពុងដំណើរការ... 🔄
        </span>
      </div>
    );
  return (
    <>
      {/* Modal Disable/enable */}
      <div className="overflow-hidden">
        <Modal
          isOpen={isModalOpen}
          btnNo={
            <Button
              color="red"
              text="ទេ"
              onClick={() => setIsModalOpen(false)}
              className="!px-4.5"
            />
          }
          btnOk={<Button color="blue" text="បាទ" className=" px-3" />}
          routeWeb="/admin/user-list"
          routeAPIType="post"
          routeAPI="/api/users/unsuspend/?id="
          id={id}
          text="បើក"
        />
        <ModalReject
          isOpen={isModalReject}
          btnNo={
            <Button
              color="red"
              text="ទេ"
              onClick={() => setIsModalReject(false)}
              className="!px-4.5"
            />
          }
          btnOk={<Button color="blue" text="បាទ" className=" px-3" />}
          routeWeb="/admin/user-list"
          routeAPIType="post"
          routeAPI="/api/users/suspend/?id="
          id={id}
          text="បិទ"
        />
      </div>
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" />
            <Link to="/admin/user-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / អ្នកប្រើប្រាស់
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
            <div className="hidden sm:block ml-auto">
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
        <div className="relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="">
            <div className="px-5 py-2">
              <label
                style={{ fontFamily: "Hanuman, sans-serif" }}
                className="font-bold text-lg text-[#2a4f8a]"
              >
                លម្អិតអ្នកប្រើប្រាស់
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
                    <div data-column-id="2">លេខសម្គាល់</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.staff_id ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">ឈ្មោះ</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.username_kh ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">ភេទ</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.sex == "MALE" ? "ប្រុស" : "ស្រី"}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">លេខទូរស័ព្ទ</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.phone_number ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">តួនាទី</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {(() => {
                      if (user.role === "SUPERUSER") {
                        return "អ្នកគ្រប់គ្រងជាន់ខ្ពស់";
                      } else if (user.role === "ADMIN") {
                        return "អ្នកគ្រប់គ្រង";
                      } else {
                        return "អ្នកប្រើប្រាស់";
                      }
                    })()}
                  </li>
                </ul>
              </div>
              {/* grid two */}
              <div className="">
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">ឈ្មោះអ្នកប្រើប្រាស់</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Moul,serif" }}
                  >
                    {user.username ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">អ៊ីមែល</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Moul,serif" }}
                  >
                    {user.email ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">មុខតំណែង</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.position ?? ""}
                  </li>
                </ul>
                <ul
                  className={`flex mb-2${
                    user.is_suspended != 1 ? "hidden" : ""
                  }`}
                >
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">មូលហេតុ</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.suspended_reason ?? ""}
                  </li>
                </ul>
                <ul className="flex mb-2">
                  <li
                    className="font-bold text-md w-[260px]"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    <div data-column-id="2">កាលបរិច្ឆេទបង្កើត</div>
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.date_joined ?? ""}
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
                <Link to="/admin/user-list">
                  <Button color="slate" text="ត្រលប់ក្រោយ" className="" />
                </Link>
              </div>
              {(() => {
                if (userLog.role === "SUPERUSER") {
                  return (
                    <div>
                      <div
                        className={`${user.is_suspended != 0 ? "hidden" : ""}`}
                      >
                        <Button
                          color="red"
                          text="បិទ"
                          className="!px-2.5 !pt-2 !pb-1"
                          onClick={() => setIsModalReject(true)}
                        />
                      </div>
                      <div
                        className={`${user.is_suspended != 1 ? "hidden" : ""}`}
                      >
                        <Button
                          color="blue"
                          text="បើក"
                          className="!px-2.5 !pt-2 !pb-1"
                          onClick={() => setIsModalOpen(true)}
                        />
                      </div>
                    </div>
                  );
                } else if (userLog.role === "ADMIN") {
                  return (
                    <div className={`${user.role === "ADMIN" ? "hidden" : ""}`}>
                      <div
                        className={`${user.is_suspended != 0 ? "hidden" : ""}`}
                      >
                        <Button
                          color="red"
                          text="បិទ"
                          className="!px-2.5 !pt-2 !pb-1"
                          onClick={() => setIsModalReject(true)}
                        />
                      </div>
                      <div
                        className={`${user.is_suspended != 1 ? "hidden" : ""}`}
                      >
                        <Button
                          color="blue"
                          text="បើក"
                          className="!px-2.5 !pt-2 !pb-1"
                          onClick={() => setIsModalOpen(true)}
                        />
                      </div>
                    </div>
                  );
                } else {
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
