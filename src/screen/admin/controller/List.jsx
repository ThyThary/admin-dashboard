import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const ListIcon = lazy(() => import("../../../icons/svg/List"));
const DetailIcon = lazy(() => import("../../../icons/svg/Detail"));
const Button = lazy(() => import("../../../style/tailwind/Button"));
const Input = lazy(() => import("../../../style/tailwind/Input"));

import DataTable from "react-data-table-component";
import Modal from "../../../components/Modal";
import DateKhmer from "../../../components/DateKhmer";
import LoadingPage from "../../../components/LoadingPage";
import api from "../../../api";
import "./style/table.css";
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
      padding: "1px 5px",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    },
    {
      name: "ពាក្យខ្មែរ",
      selector: (row) => row.word_kh,
      cell: (row) => <div className="w-32 truncate">{row.word_kh}</div>,
      sortable: true,
    },
    {
      name: "និយមន័យខ្មែរ",
      selector: (row) => row.word_kh_definition,
      cell: (row) => (
        <div className=" w-40 truncate">{row.word_kh_definition}</div>
      ),
      sortable: true,
    },
    {
      name: "ពាក្យអង់គ្លេស",
      selector: (row) => row.word_en,
      cell: (row) => (
        <div className="w-32 truncate" style={{ fontFamily: "Moul,serif" }}>
          {row.word_en}
        </div>
      ),
      sortable: true,
    },
    {
      name: "និយមន័យអង់គ្លេស",
      selector: (row) => row.word_en_definition,
      cell: (row) => (
        <div className=" w-40 truncate" style={{ fontFamily: "Moul,serif" }}>
          {row.word_en_definition}
        </div>
      ),
      sortable: true,
    },
    { name: "អ្នកស្នើសុំ", selector: (row) => row.created_by, sortable: true },
    {
      name: "ស្ថានភាព",
      selector: (row) => row.review_status,
      cell: (row) => {
        if (row.review_status == "PENDING") {
          return (
            <span
              className=" text-green-600 font-bold"
              style={{
                fontFamily: "Hanuman, sans-serif",
                textAlign: "center",
              }}
            >
              ថ្មី
            </span>
          );
        } else if (row.review_status == "APPROVED") {
          return (
            <span
              className=" text-blue-600 font-bold"
              style={{
                fontFamily: "Hanuman, sans-serif",
              }}
            >
              អនុម័ត
            </span>
          );
        } else {
          return (
            <span
              className="text-red-600 font-bold "
              style={{
                fontFamily: "Hanuman, sans-serif",
              }}
            >
              បដិសេធ
            </span>
          );
        }
      },
      sortable: true,
    },
    {
      name: "កាលបរិច្ឆេទបង្កើត",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "សកម្មភាពផ្សេងៗ",
      selector: (row) => row.actions,

      cell: (row) => (
        <div className="w-full flex gap-2 !items-center !justify-center *:hover:scale-110">
          <Link to={`/admin/controller-detail/${row.id}`}>
            <button title="Detail">
              <DetailIcon name="detail" size="18" color="" />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get("/api/dictionary/staging/list", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      })
      .then((res) => {
        console.log(res.data.data.entries);
        setRecords(res.data.data.entries);
        setOriginalData(res.data.data.entries);
        setPending(false);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setPending(false);
      });
  }, []);
  // Search data
  const handleFilter = (e) => {
    const searchValue = e.target.value.normalize("NFC").toLowerCase().trim();
    if (searchValue === "") {
      setRecords(originalData); // Reset if input is empty
    } else {
      const filteredData = originalData.filter((row) => {
        const fieldsToSearch = [
          row.word_kh,
          row.word_kh_definition,
          row.word_en,
          row.word_en_definition,
          row.created_by,
        ];
        return fieldsToSearch.some((field) =>
          (field || "").normalize("NFC").toLowerCase().includes(searchValue)
        );
      });
      setRecords(filteredData);
    }
  };
  return (
    <>
      <div className="overflow-hidden">
        <Modal
          isOpen={isModalOpen}
          btnNo={
            <Button
              color="red"
              text="បដិសេធ"
              onClick={() => setIsModalOpen(false)}
              className=""
            />
          }
          btnOk={<Button color="blue" text="យល់ព្រម" className="" />}
        />
      </div>
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
