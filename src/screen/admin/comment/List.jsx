import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const ListIcon = lazy(() => import("../../../icons/svg/List"));
const Input = lazy(() => import("../../../style/tailwind/Input"));

import DataTable from "react-data-table-component";
import DateKhmer from "../../../components/DateKhmer";
import LoadingPage from "../../../components/LoadingPage";
import api from "../../../api";
import "../user/style/table.css";
// Remove bottom
const rbs = {
  tableWrapper: {
    style: {
      borderBottom: "none", // Removes the bottom border
    },
  },
};
// Custom Styles
const customStyles = {
  table: {
    style: {
      border: "1px solid #2f7447", // Border around the table
    },
  },
  rows: {
    style: {
      border: "none",
      fontFamily: "Hanuman, sans-serif",
      minHeight: "8px", // Row height
      "&:nth-of-type(odd)": {
        backgroundColor: "#F3F4F6", // Light gray for even rows
      },
      "&:hover": {
        backgroundColor: "#d6d8db",
      },
    },
  },
  headCells: {
    style: {
      fontFamily: "Hanuman, sans-serif",
      backgroundColor: "#2a4f8a",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: "center",
      // padding: "0px 10px",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      padding: "2.2px 5px",
      textAlign: "center",
      justifyContent: "center",
      fontFamily: "Hanuman, sans-serif",
    },
  },
};
// Pagination
const paginationOptions = {
  rowsPerPageText: "កំពុងបង្ហាញ",
  rangeSeparatorText: "នៃ",
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
  noRowsPerPage: false,
};

const List = () => {
  const [value, setValue] = useState("");
  const [records, setRecords] = useState();
  const [originalData, setOriginalData] = useState();
  const [entries, setEntries] = useState(10);
  const [pending, setPending] = useState(true);
  // Table header
  const columns = [
    {
      name: "ល.រ",
      width: "80px",
      selector: (row) => row.index,
      cell: (row, index) => (
        <div
          className="w-10 text-center"
          style={{ fontFamily: "Hanuman, sans-serif" }}
        >
          {index + 1}
        </div>
      ),
      // sortable: true,
    },
    {
      name: "លេខសម្គាល់ឧបករណ៍",
      width: "170px",
      selector: (row) => row.device_id,
      cell: (row) => (
        <div style={{ fontFamily: "Moul,serif" }}>{row.device_id}</div>
      ),
      sortable: true,
    },
    {
      name: "មតិអ្នកប្រើប្រាស់",
      selector: (row) => row.detail,
      cell: (row) => <div>{row.detail}</div>,
      sortable: true,
    },
    {
      name: "កាលបរិច្ឆេទបង្កើត",
      cell: (row) => (
        <div style={{ fontFamily: "Hanuman, sans-serif" }}>
          {row.created_at}
        </div>
      ),
      sortable: true,
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get("/api/users/comment/", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      })
      .then((res) => {
        console.log(res.data.data.comments);
        setRecords(res.data.data.comments);
        setOriginalData(res.data.data.comments);
        setPending(false);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setPending(false);
      });
  }, []);
  // Search data
  const handleFilter = (e) => {
    const searchValue = e.target.value.normalize("NFC").toLowerCase();
    console.log(searchValue);
    if (searchValue === "") {
      setRecords(originalData); // Reset to originalData data when input is cleared
    } else {
      const newData = records.filter((row) => {
        const kh = row.detail?.normalize("NFC") || "";
        const en = row.detail?.toLowerCase() || "";
        const deId = row.device_id?.toLowerCase() || "";
        return (
          kh.includes(searchValue) ||
          en.includes(searchValue) ||
          deId.includes(searchValue)
        );
      });
      setRecords(newData);
    }
  };

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
                / មតិយោបល់
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
        <div className=" bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="px-5 pt-5">
            <div className="pb-5 flex w-full">
              {records ? (
                <div className=" text-left">
                  <Input
                    label=""
                    placeholder="ស្វែងរក..."
                    classNname="w-40"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      handleFilter(e);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="text-right ml-auto items-center hidden">
                <label
                  style={{ fontFamily: "Hanuman, sans-serif" }}
                  className="mr-2"
                >
                  បង្ហាញ
                </label>
                <select
                  onChange={(e) => {
                    setEntries(Number(e.target.value));
                  }}
                  value={entries}
                  className="px-2 py-1.5 border border-[#2f7447] rounded-lg focus:outline-none hover:border-1 hover:border-blue-500"
                >
                  {[10, 20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label
                  style={{ fontFamily: "Hanuman, sans-serif" }}
                  className="ml-2"
                >
                  ទិន្នន័យ
                </label>
              </div>
            </div>
            {/* Invoke table */}
            <div>
              <DataTable
                columns={columns}
                data={records}
                //No data
                noDataComponent={
                  <div
                    style={{
                      fontFamily: "Hanuman, sans-serif",
                      padding: "10px",
                    }}
                  >
                    គ្មានទិន្នន័យសម្រាប់បង្ហាញ
                  </div>
                }
                customStyles={records ? customStyles : rbs}
                fixedHeader={false}
                pagination
                progressPending={pending}
                paginationComponentOptions={paginationOptions}
                paginationPerPage={entries} // Controlled by state
                paginationRowsPerPageOptions={[10, 20, 50, 100]}
                progressComponent={<LoadingPage />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
