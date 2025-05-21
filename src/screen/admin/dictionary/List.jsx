import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const ListIcon = lazy(() => import("../../../icons/svg/List"));
const EditIcon = lazy(() => import("../../../icons/svg/Edit"));
const DetailIcon = lazy(() => import("../../../icons/svg/Detail"));
const DeleteIcon = lazy(() => import("../../../icons/svg/Delete"));
const Button = lazy(() => import("../../../style/tailwind/Button"));

import Modal from "../../../components/Modal";
import DateKhmer from "../../../components/DateKhmer";
import LoadingPage from "../../../components/LoadingPage";
import api from "../../../config/api";
import "../../../style/css/table.css";
const List = () => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      setLoading(true);

      try {
        const res = await api.get(`/api/dictionary/list`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { search, page: currentPage, per_page: perPage },
        });
        console.log(res.data);
        setData(res.data.data.entries);
        setTotalEntries(res.data.data.total_entries); // Correct total count if available
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, currentPage, perPage]);

  const totalPages = Math.ceil(totalEntries / perPage);
  function getPageNumbers(current, total) {
    const delta = 2;
    const range = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) range.push(i);

    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
  }

  return (
    <>
      <div className="overflow-hidden">
        <Modal
          isOpen={isModalOpen}
          btnNo={
            <Button
              color="red"
              text="ទេ"
              onClick={() => setIsModalOpen(false)}
              className="px-4.5"
            />
          }
          btnOk={<Button color="blue" text="បាទ" className="px-3" />}
          routeWeb="/admin/dictionary-list"
          routeAPIType="delete"
          routeAPI="/api/dictionary/drop?id="
          id={userId}
          text="លុប"
        />
      </div>
      <div className=" flex-row ">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5 ">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2 w-full">
            <HomeIcon name="home" size="15" color="#6B7280" />
            <Link to="/admin/dictionary-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / វចនានុក្រម
              </label>
            </Link>
            <Link to="">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / បញ្ជី
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
                បញ្ជី
              </label>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="lg:w-full p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <label
                    className=""
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    កំពុងបង្ហាញ
                  </label>
                  <select
                    value={perPage}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setPerPage(Number(e.target.value));
                    }}
                    className="px-2 py-[4.5px] border border-[#2f7447] rounded-lg focus:outline-none hover:border-blue-500"
                  >
                    {[10, 25, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                placeholder="ស្វែងរក..."
                value={search}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearch(e.target.value);
                }}
                className="px-2 py-2 border border-[#2f7447] rounded-lg focus:outline-none hover:border-1"
                style={{
                  fontFamily: "Hanuman, sans-serif",
                  fontSize: "12px",
                }}
              />
            </div>

            {loading ? (
              <LoadingPage />
            ) : (
              <>
                <table className="min-w-full text-sm border border-[#2f7447]">
                  <thead className="bg-gray-100 head">
                    <tr className="*:whitespace-nowrap">
                      <th className="px-4 py-4 w-10">ល.រ</th>
                      <th className="px-4 py-4 ">ពាក្យខ្មែរ</th>
                      <th className="px-4 py-4">និយមន័យខ្មែរ</th>
                      <th className="px-4 py-4">ពាក្យអង់គ្លេស</th>
                      <th className="px-4 py-4">និយមន័យអង់គ្លេស</th>
                      <th className="px-4 py-4">សកម្មភាពផ្សេងៗ</th>
                    </tr>
                  </thead>
                  <tbody className="*:whitespace-nowrap">
                    {data.length === 0 ? (
                      <tr className="column-no-data">
                        <td
                          colSpan={6}
                          className="px-2 py-[4.5px] text-center "
                        >
                          គ្មានទិន្នន័យ
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={item.id} className="column">
                          <td className="px-2 py-[5.3px]">
                            {(currentPage - 1) * perPage + index + 1}
                          </td>
                          <td className="px-2 py-[5.3px] text-center ">
                            <div className=" w-40 truncate">
                              {item.word_kh || ""}
                            </div>
                          </td>
                          <td className="px-2 py-[5.3px]">
                            <div className="w-70 truncate">
                              {item.word_kh_definition || ""}
                            </div>
                          </td>
                          <td
                            className="px-2 py-[4.5px] truncate w-32"
                            style={{ fontFamily: "Moul,serif" }}
                          >
                            <div className="w-40 truncate">
                              {item.word_en || ""}
                            </div>
                          </td>
                          <td
                            className="px-2 py-[4.5px] truncate w-40"
                            style={{ fontFamily: "Moul,serif" }}
                          >
                            <div className="w-70 truncate">
                              {item.word_en_definition || ""}
                            </div>
                          </td>

                          <td className="px-2 py-[1px]">
                            {(
                              <div className="w-full flex gap-2 !items-center !justify-center *:hover:scale-110">
                                <Link
                                  to={`/admin/dictionary-edit/${item.id}`}
                                  className={`${
                                    user.role !== "SUPERUSER" ? "hidden" : ""
                                  }`}
                                >
                                  <button title="Edit">
                                    <EditIcon name="edit" size="20" color="" />
                                  </button>
                                </Link>
                                <Link
                                  to={`/admin/dictionary-detail/${item.id}`}
                                >
                                  <button title="Detail">
                                    <DetailIcon
                                      name="detail"
                                      size="18"
                                      color=""
                                    />
                                  </button>
                                </Link>
                                <div
                                  className={`${
                                    user.role !== "SUPERUSER" ? "hidden" : ""
                                  }`}
                                >
                                  <button
                                    title="Delete"
                                    onClick={() => {
                                      setIsModalOpen(true);
                                      setUserId(item.id);
                                    }}
                                  >
                                    <DeleteIcon
                                      name="delete"
                                      size="18"
                                      color=""
                                    />
                                  </button>
                                </div>
                              </div>
                            ) || <span className=""> N/A</span>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    កំពុងបង្ហាញ{" "}
                    {(currentPage - 1) * perPage + (totalEntries !== 0 ? 1 : 0)}{" "}
                    ទៅ {Math.min(currentPage * perPage, totalEntries)} នៃ{" "}
                    {totalEntries} ទិន្នន័យ
                  </p>

                  <div className="flex space-x-1">
                    {getPageNumbers(currentPage, totalPages).map(
                      (page, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof page === "number" && setCurrentPage(page)
                          }
                          disabled={page === "..."}
                          className={`px-3 py-1 rounded ${
                            page === currentPage
                              ? "bg-[#375883] text-white"
                              : "bg-gray-100 hover:bg-blue-200"
                          } ${page === "..." ? "cursor-default" : ""}`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
