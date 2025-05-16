import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../../icons/svg/Home";
import ListIcon from "../../../icons/svg/List";
import EditIcon from "../../../icons/svg/Edit";
import DetailIcon from "../../../icons/svg/Detail";
import DeleteIcon from "../../../icons/svg/Delete";
import Button from "../../../style/tailwind/Button";
import Modal from "../../../components/Modal";
import DateKhmer from "../../../components/DateKhmer";
import LoadingPage from "../../../components/LoadingPage";
import api from "../../../api";
import "./style/table.css";

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
        const res = await api.get(`/api/users/list`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { search, page: currentPage, per_page: perPage },
        });
        setData(res.data.data.users);
        console.log(res.data);
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
          routeWeb="/admin/user-list"
          routeAPIType="delete"
          routeAPI="/api/users/drop?id="
          id={userId}
          text="លុប"
        />
      </div>
      <div className=" flex-row ">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5 ">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2 w-full">
            <HomeIcon name="home" size="15" color="#6B7280" />
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
            <div className=" flex items-center ml-auto text-right gap-x-3">
              <div>
                <Link to="/admin/user-create">
                  <Button color="blue" text="បង្កើត" className="px-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className=" bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="p-6">
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
                <table className="min-w-full  text-sm border border-[#2f7447]">
                  <thead className="bg-gray-100 head">
                    <tr className="*:whitespace-nowrap">
                      <th className="px-4 py-4 w-10">ល.រ</th>
                      <th className="px-4 py-4">លេខសម្គាល់</th>
                      <th className="px-4 py-4">ឈ្មោះ</th>
                      <th className="px-4 py-4">មុខតំណែង</th>
                      <th className="px-4 py-4">អ៊ីមែល</th>
                      <th className="px-4 py-4">ស្ថានភាព</th>
                      <th className="px-4 py-4">កាលបរិច្ឆេទបង្កើត</th>
                      <th className="px-4 py-4">សកម្មភាពផ្សេងៗ</th>
                    </tr>
                  </thead>
                  <tbody className="*:whitespace-nowrap">
                    {data.length === 0 ? (
                      <tr className="column-no-data">
                        <td
                          colSpan={8}
                          className="px-2 py-[4.5px] text-center "
                        >
                          គ្មានទិន្នន័យ
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={item.id} className="column">
                          <td className="px-2 py-[4.5px]">
                            {(currentPage - 1) * perPage + index + 1}
                          </td>
                          <td className="px-2 py-[4.5px]">
                            {item.staff_id || <span className="">N/A</span>}
                          </td>
                          <td className="px-2 py-[4.5px]">
                            {item.username_kh || <span className="">N/A</span>}
                          </td>
                          <td className="px-2 py-[4.5px] truncate w-60">
                            {item.position || <span className="">N/A</span>}
                          </td>
                          <td
                            className="px-2 py-[4.5px] truncate w-60"
                            style={{
                              fontFamily: "Moul,serif",
                              fontSize: "14px",
                            }}
                          >
                            {item.email || <span className="">N/A</span>}
                          </td>
                          <td className="px-2 py-[4.5px]">
                            {(() => {
                              if (item.is_suspended === 1) {
                                return (
                                  <span
                                    className="text-red-600 font-bold "
                                    style={{
                                      fontFamily: "Hanuman, sans-serif",
                                      textAlign: "center",
                                    }}
                                  >
                                    បិទ
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    className="text-green-600 font-bold "
                                    style={{
                                      fontFamily: "Hanuman, sans-serif",
                                    }}
                                  >
                                    បើក
                                  </span>
                                );
                              }
                            })()}
                          </td>
                          <td className="px-2 py-[4.5px]">
                            {item.date_joined || <span className="">N/A</span>}
                          </td>
                          <td className="px-2 py-[1px]">
                            {(() => {
                              if (user.role === "SUPERUSER") {
                                return (
                                  <div className="w-full flex gap-2 text-center !items-center !justify-center *:hover:scale-110">
                                    <Link to={`/admin/user-edit/${item.id}`}>
                                      <button title="Edit">
                                        <EditIcon
                                          name="edit"
                                          size="20"
                                          color=""
                                        />
                                      </button>
                                    </Link>
                                    <Link to={`/admin/user-detail/${item.id}`}>
                                      <button title="Detail">
                                        <DetailIcon
                                          name="detail"
                                          size="18"
                                          color=""
                                        />
                                      </button>
                                    </Link>
                                    <div>
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
                                );
                              } else {
                                return (
                                  <div className="w-full flex gap-2 text-center !items-center !justify-center *:hover:scale-110">
                                    <Link
                                      to={`/admin/user-edit/${item.id}`}
                                      className={`${
                                        item.role == "USER" ? "" : "hidden"
                                      }`}
                                    >
                                      <button title="Edit">
                                        <EditIcon
                                          name="edit"
                                          size="20"
                                          color=""
                                        />
                                      </button>
                                    </Link>
                                    <Link
                                      to={`/admin/user-detail/${item.id}`}
                                      className={`${
                                        item.role == "USER" ? "" : "pl-1"
                                      }`}
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
                                        item.role == "USER" ? "" : "hidden"
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
                                );
                              }
                            })()}
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
                    កំពុងបង្ហាញ {(currentPage - 1) * perPage + 1} ទៅ{" "}
                    {Math.min(currentPage * perPage, totalEntries)} នៃ{" "}
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
