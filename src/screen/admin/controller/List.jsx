import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const ListIcon = lazy(() => import("../../../icons/svg/List"));
const DetailIcon = lazy(() => import("../../../icons/svg/Detail"));

import DateKhmer from "../../../components/DateKhmer";
import LoadingTable from "../../../components/LoadingTable";
import api from "../../../config/api";
import "../../../style/css/table.css";
const statusStyles = {
  PENDING: { label: "ថ្មី", color: "text-green-600" },
  APPROVED: { label: "អនុម័ត", color: "text-blue-600" },
  REJECTED: { label: "បដិសេធ", color: "text-red-600" },
};
const List = () => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500); // delay = 500ms = 0.5s
  const debouncedStatus = useDebounceStatus(search, 500); // delay = 500ms = 0.5s
  //Delay after user search
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    if (value === "ថ្មី" || value === "អនុម័ត" || value === "បដិសេធ") {
      value = "";
    } else {
      value = value;
    }
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }
  //Delay after user search
  function useDebounceStatus(value, delay) {
    if (value === "ថ្មី" || value === "អនុម័ត" || value === "បដិសេធ") {
      if (value === "ថ្មី") {
        value = "PENDING";
      }
      if (value === "អនុម័ត") {
        value = "APPROVED";
      }
      if (value === "បដិសេធ") {
        value = "REJECTED";
      }
    } else {
      value = "";
    }
    console.log(value);
    const [debouncedStatusValue, setDebouncedStatusValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedStatusValue(value);
      }, delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedStatusValue;
  }

  let globalIndex = 0;
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      setLoading(true);

      try {
        const res = await api.get(`/api/dictionary/staging/list`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search: debouncedSearch,
            status: debouncedStatus,
            page: currentPage,
            per_page: perPage,
          },
        });
        setData(res.data.data.entries);
        console.log(res.data);
        setTotalEntries(res.data.data.total_entries); // Correct total count if available
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, debouncedStatus, currentPage, perPage]);

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
      <div className=" flex-row ">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5 ">
          {/* Breakcrabe */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2 w-full">
            <HomeIcon name="home" size="15" color="#6B7280" />
            <Link to="/admin/controller-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ត្រួតពិនិត្យសំណើ
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
                  fontSize: "13px",
                }}
              />
              <div className="mb-1">
                <div className="flex items-center space-x-2">
                  <label
                    className=""
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "13px",
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
                    className="cursor-pointer px-2 py-1.5 border border-[#2f7447] rounded-lg focus:outline-none hover:border-blue-500"
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    {[10, 25, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <>
              <table className="min-w-full  text-sm border border-b-0 border-[#2f7447]">
                <thead className="sticky bg-gray-100 head">
                  <tr className="*:whitespace-nowrap *:px-2 *:py-4">
                    <th className="w-[5%]">ល.រ</th>
                    <th className="w-[13%]">ពាក្យខ្មែរ</th>
                    <th className="w-[20%]">និយមន័យខ្មែរ</th>
                    <th className="w-[13%]">ពាក្យអង់គ្លេស</th>
                    <th className="w-[20%]">និយមន័យអង់គ្លេស</th>
                    <th className="w-[9%]">ស្ថានភាព</th>
                    <th className="w-[10%]">កាលបរិច្ឆេទបង្កើត</th>
                    <th className="w-[10%]">សកម្មភាពផ្សេងៗ</th>
                  </tr>
                </thead>
              </table>
              <div className="w-full max-h-[50vh] overflow-y-auto overflow-x-auto">
                <table className="table-fixed w-full min-w-[1000px] text-sm border border-t-0 border-[#2f7447]">
                  {loading ? (
                    <tbody>
                      <tr>
                        <td
                          colSpan={8}
                          className="px-2 py-[4.5px] text-center "
                        >
                          <LoadingTable />
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="*:whitespace-nowrap divide-y">
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
                        ["PENDING", "APPROVED", "REJECTED"].map((status) =>
                          data
                            .filter((item) => item.review_status === status)
                            .map((item) => {
                              globalIndex += 1;
                              const style = statusStyles[
                                item.review_status
                              ] || {
                                label: item.review_status,
                                color: "text-gray-600",
                              };

                              return (
                                <tr
                                  key={`${status}-${item.id}`}
                                  className="column"
                                >
                                  <td className="w-[5%] px-2 py-[5.3px]">
                                    {(currentPage - 1) * perPage + globalIndex}
                                  </td>
                                  <td className="w-[13%] px-2 py-[5.3px] ">
                                    <div className="w-full truncate">
                                      {item.word_kh || ""}
                                    </div>
                                  </td>
                                  <td className="w-[20%] px-2 py-[5.3px]">
                                    <div className="w-full truncate">
                                      {item.word_kh_definition || ""}
                                    </div>
                                  </td>
                                  <td
                                    className="w-[13%] px-2 py-[4.5px] "
                                    style={{ fontFamily: "Moul,serif" }}
                                  >
                                    <div className="w-full truncate">
                                      {item.word_en || ""}
                                    </div>
                                  </td>
                                  <td
                                    className="w-[20%] px-2 py-[4.5px] "
                                    style={{ fontFamily: "Moul,serif" }}
                                  >
                                    <div className="w-full truncate">
                                      {item.word_en_definition || ""}
                                    </div>
                                  </td>
                                  <td className="w-[9%] px-2 py-[5.3px]">
                                    <span
                                      className={`${style.color} font-bold`}
                                      style={{
                                        fontFamily: "Hanuman, sans-serif",
                                        textAlign: "center",
                                      }}
                                    >
                                      {style.label}
                                    </span>
                                  </td>
                                  <td className="w-[10%] px-2 py-[5.3px]">
                                    {item.created_at || ""}
                                  </td>
                                  <td className="w-[10%] px-2 py-[1px]">
                                    <div className="w-full flex gap-x-2 items-center justify-center *:hover:scale-110">
                                      <Link
                                        to={`/admin/controller-detail/${item.id}`}
                                      >
                                        <button title="Detail">
                                          <DetailIcon name="detail" size="18" />
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                        )
                      )}
                    </tbody>
                  )}
                </table>
                <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    កំពុងបង្ហាញ{" "}
                    {(currentPage - 1) * perPage + (totalEntries !== 0 ? 1 : 0)}{" "}
                    ទៅ {Math.min(currentPage * perPage, totalEntries)} នៃ{" "}
                    {totalEntries} ទិន្នន័យ
                  </p>
                  <div
                    className="flex space-x-1 items-center justify-center"
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`mr-2 px-2.5 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-blue-200 cursor-pointer"
                      }`}
                    >
                      មុន
                    </button>
                    {getPageNumbers(currentPage, totalPages).map(
                      (page, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof page === "number" && setCurrentPage(page)
                          }
                          disabled={page === "..."}
                          className={`px-2.5 py-1 rounded cursor-pointer ${
                            page === currentPage
                              ? "bg-[#375883] text-white"
                              : "bg-gray-100 hover:bg-blue-200"
                          } ${page === "..." ? "cursor-default" : ""}`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`ml-1 px-2.5 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-blue-200 cursor-pointer"
                      }`}
                    >
                      បន្ទាប់
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
