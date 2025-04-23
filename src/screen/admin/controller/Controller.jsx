import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../../icons/svg/Home";
import ListIcon from "../../../icons/svg/List";
import DetailIcon from "../../../icons/svg/Detail";
import Button from "../../../style/tailwind/Button";
import DataTable from "react-data-table-component";
import Input from "../../../style/tailwind/Input";
import Modal from "../../../components/Modal";
import DateKhmer from "../../../components/DateKhmer";
import Detail from "./Detail";
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
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      padding: "3px 5px",
    },
  },
};

//  Testing data
const data = [
  {
    index: 1,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 2,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 3,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 4,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 5,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 6,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 7,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 8,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 9,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 10,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
  {
    index: 11,
    id: "ចន្ទគតិកាល",
    name: "(បា.)កាលរដូវដែលកំណត់តាមដំណើរព្រះចន្ទក្នុងឆ្នាំ",
    positon: "រិទ្ធិ សុផារ៉ា",
    email: "ថ្មី",
    createDate: "១៣-មីនា-២០២៥",
    actions: "Testing",
  },
];
const paginationOptions = {
  rowsPerPageText: "កំពុងបង្ហាញ",
  rangeSeparatorText: "នៃ",
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
  noRowsPerPage: false,
};
const Controller = () => {
  const [value, setValue] = useState("");
  const [records, setRecords] = useState(data);
  const [entries, setEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // Table columns
  const columns = [
    { name: "ល.រ", selector: (row) => row.index, sortable: true, center: true },
    {
      name: "ពាក្យ",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    { name: "និយមន័យ", selector: (row) => row.name, center: true },
    { name: "អ្នកស្នើសុំ", selector: (row) => row.positon, center: true },
    {
      name: "ស្ថានភាព",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "កាលបរិច្ឆេទបង្កើត",
      selector: (row) => row.createDate,
      sortable: true,
      center: true,
    },
    {
      name: "សកម្មភាពផ្សេងៗ",
      selector: (row) => row.actions,
      sortable: true,
      center: true,
      cell: () => (
        <div className="w-full flex gap-2 !items-center !justify-center *:hover:scale-110">
          <Link to="/admin/controller-detail">
            <button
              title="Detail"
              onClick={(e) => {
                setUserId(1);
              }}
            >
              <DetailIcon name="detail" size="18" color="" />
              {/* <Detail getId={userId} /> */}
            </button>
          </Link>
        </div>
      ),
    },
  ];
  // Search data
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
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
        <div hidden>
          {" "}
          <Detail id={userId} />;
        </div>
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
                / ត្រួតពិនិត្យសំណើរ
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
            <div className="flex ml-auto">
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

            <div className="">
              <DataTable
                columns={columns}
                data={records}
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
                customStyles={customStyles}
                fixedHeader
                pagination
                paginationComponentOptions={paginationOptions}
                paginationPerPage={entries} // Controlled by state
                paginationRowsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controller;
