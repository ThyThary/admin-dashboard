import React, { lazy, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DateKhmer from "../../../components/DateKhmer";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const DetailIcon = lazy(() => import("../../../icons/svg/Detail"));
const Button = lazy(() => import("../../../style/tailwind/Button"));
import capitalizeFirst from "../../../validate/capitalizeFirst";
import Modal from "../../../components/Modal";
import ModalReject from "./ModalReject";
import api from "../../../api";
function Detail() {
  // Get user id
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReject, setIsModalReject] = useState(false);
  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get(`/api/dictionary/staging/detail?id=${id}`, {
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
      {/* Modal Delete */}
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
          routeWeb="/admin/controller-list"
          routeAPIType="post"
          routeAPI="/api/dictionary/staging/approve?id="
          id={id}
          text="អនុម័ត"
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
          routeWeb="/admin/controller-list"
          routeAPIType="post"
          routeAPI="/api/dictionary/staging/approve?id="
          id={id}
          text="អនុម័ត"
        />
      </div>
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" />
            <Link to="/admin/controller-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ត្រួតពិនិត្យសំណើរ
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
              {" "}
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
                លម្អិតត្រួតពិនិត្យសំណើ
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
                    អ្នកស្នើសុំ
                  </li>
                  <li className="">:</li>
                  <li
                    className="ml-6 text-md w-full"
                    style={{ fontFamily: "Hanuman, sans-serif" }}
                  >
                    {user.created_by}
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
                    {(() => {
                      if (user.review_status == "PENDING") {
                        return <span className=" text-green-600">ថ្មី</span>;
                      } else if (user.review_status == "APPROVED") {
                        return <span className=" text-blue-600">អនុម័ត</span>;
                      } else {
                        return <span className=" text-red-600">បដិសេធ</span>;
                      }
                    })()}
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
                    {user.word_kh}
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
                    {user.word_kh_type}
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
                    {user.word_kh_definition}
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
                    {user.created_at}
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
                    {user.reviewed_at}
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
                    {user.word_en}
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
                    {capitalizeFirst(user.word_en_type)}
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
                    {user.word_en_definition}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* button */}
          <div className=" absolute  sm:col-span-2 text-end right-5 bottom-5">
            {(() => {
              if (user.review_status == "PENDING") {
                return (
                  <div className="flex gap-3">
                    {" "}
                    {/* <Link to="/admin/controller-list"> */}
                    {/* <Button color="red" text="បដិសេធ" className="" /> */}
                    <Button
                      color="red"
                      text="បដិសេធ"
                      className=""
                      onClick={() => setIsModalReject(true)}
                    />
                    {/* </Link> */}
                    <div>
                      <Button
                        color="blue"
                        text="អនុម័ត"
                        className=""
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
