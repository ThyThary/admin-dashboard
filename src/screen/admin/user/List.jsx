import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../../icons/svg/Home";
import ListIcon from "../../../icons/svg/List";
import EditIcon from "../../../icons/svg/Edit";
import DetailIcon from "../../../icons/svg/Detail";
import DeleteIcon from "../../../icons/svg/Delete";
import Button from "../../../style/tailwind/Button";
import DataTable from "react-data-table-component";
import Input from "../../../style/tailwind/Input";
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
      textAlign: "center",
      justifyContent: "center",
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

const UserList = () => {
  const [value, setValue] = useState("");
  const [records, setRecords] = useState();
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [pending, setPending] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.role);
  // Table header
  const columns = [
    {
      name: "ល.រ",
      width: "60px",
      cell: (row, index) => (
        <div style={{ fontFamily: "Moul,serif" }}>{index + 1}</div>
      ),
      // center: true,
    },
    {
      name: "លេខសម្គាល់",
      selector: (row) => row.staff_id,
      sortable: true,
      // center: true,
    },
    { name: "ឈ្មោះ", selector: (row) => row.username_kh },
    {
      name: "មុខតំណែង",
      selector: (row) => row.position,
      cell: (row) => (
        <div
          className="truncate w-60"
          style={{ fontFamily: "Hanuman, sans-serif", fontSize: "14px" }}
        >
          {row.position}
        </div>
      ),
    },
    {
      name: "អ៊ីមែល",
      selector: (row) => row.email,
      cell: (row) => (
        <div
          className="truncate w-60"
          style={{ fontFamily: "Moul,serif", fontSize: "14px" }}
        >
          {row.email}
        </div>
      ),
    },
    {
      name: "កាលបរិច្ឆេទបង្កើត",
      selector: (row) => row.date_joined,
      // center: true,
    },
    {
      name: "សកម្មភាពផ្សេងៗ",
      selector: (row) => row.id,
      // center: true,
      cell: (row) => {
        if (user.role === "SUPERUSER") {
          return (
            <div className="w-full flex gap-2 text-center !items-center !justify-center *:hover:scale-110">
              <Link to={`/admin/user-edit/${row.id}`}>
                <button title="Edit">
                  <EditIcon name="edit" size="20" color="" />
                </button>
              </Link>
              <Link to={`/admin/user-detail/${row.id}`}>
                <button title="Detail">
                  <DetailIcon name="detail" size="18" color="" />
                </button>
              </Link>
              <div>
                <button
                  title="Delete"
                  onClick={() => {
                    setIsModalOpen(true);
                    setUserId(row.id);
                  }}
                >
                  <DeleteIcon name="delete" size="18" color="" />
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full flex gap-2 text-center !items-center !justify-center *:hover:scale-110">
              <Link
                to={`/admin/user-edit/${row.id}`}
                className={`${row.role != "ADMIN" ? "" : "hidden"}`}
              >
                <button title="Edit">
                  <EditIcon name="edit" size="20" color="" />
                </button>
              </Link>
              <Link
                to={`/admin/user-detail/${row.id}`}
                className={`${row.role != "ADMIN" ? "" : "pl-1"}`}
              >
                <button title="Detail">
                  <DetailIcon name="detail" size="18" color="" />
                </button>
              </Link>
              <div className={`${row.role != "ADMIN" ? "" : "hidden"}`}>
                <button
                  title="Delete"
                  onClick={() => {
                    setIsModalOpen(true);
                    setUserId(row.id);
                  }}
                >
                  <DeleteIcon name="delete" size="18" color="" />
                </button>
              </div>
            </div>
          );
        }
      },
    },
  ];
  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    api
      .get("/api/users/list", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      })
      .then((res) => {
        console.log("Get data: ", res);
        setRecords(res.data.data.users);
        setPending(false);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setPending(false);
      });
  }, []);
  // Search data
  const handleFilter = (e) => {
    const newData = records.filter((row) => {
      return row.position.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

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
      <div className=" flex-row">
        <div className="flex flex-col min-h-28 max-h-28 px-5 pt-5">
          {/* breadcrumb */}
          <div className="flex flex-row items-center cursor-pointer text-gray-500 gap-x-2">
            <HomeIcon name="home" size="15" color="#6B7280" />
            <Link to="">
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
              <DateKhmer />
            </div>
          </div>
          {/* Spicify icon */}
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
            <div className=" ml-auto text-right">
              <Link to="/admin/user-create">
                <Button color="blue" text="បង្កើត" className="px-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className=" bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="px-5 pt-5">
            <div className="pb-5 flex w-full">
              {/* Search box */}
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
              {/* Data entries */}
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

export default UserList;
