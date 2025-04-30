import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const CreateIcon = lazy(() => import("../../../icons/svg/Create"));
const Input = lazy(() => import("../../../style/tailwind/Input"));
const Select = lazy(() => import("../../../style/tailwind/Select"));
const Button = lazy(() => import("../../../style/tailwind/Button"));
import Toastify from "../../../components/Toastify";
import DateKhmer from "../../../components/DateKhmer";
import validatorEnglish from "../../../validate/english";
const Create = () => {
  const [nameEnUser, setNameEnUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  //Gender value
  const genderOptions = [
    { label: "ប្រុស", value: "MALE" },
    { label: "ស្រី", value: "FEMALE" },
  ];
  //Role
  const roleOptions = [
    { label: "អ្នកប្រើប្រាស់", value: "USER" },
    { label: "អ្នកគ្រប់គ្រង", value: "ADMIN" },
  ];

  // use state data form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "Fmi$2025",
    role: "",
    sex: "",
    username_kh: "",
    position: "",
    phone_number: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    email: "",
    username_kh: "",
    role: "",
  });

  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Form validation (for front-end)
  const validateForm = () => {
    const fmisMatch = formData.email.search("@fmis.gov.kh");
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username_kh) newErrors.username_kh = "Email is required";
    if (!formData.role) newErrors.role = "Email is required";
    if (formData.email != null && fmisMatch == -1) {
      newErrors.email = "Email is required";
    }
    // alert
    if (!formData.email || !formData.username_kh || !formData.role) {
      Toastify("warning", "បញ្ចូលទិន្នន័យ");
    }
    if (
      formData.username_kh != "" &&
      formData.role != "" &&
      formData.email != "" &&
      fmisMatch == -1
    ) {
      Toastify("warning", "អ៊ីមែលត្រូវតែជា FMIS អ៊ីមែល");
    }
    return newErrors;
  };
  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ username_kh: "", email: "", role: "" });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await api.post("/api/users/register/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      Toastify("success", "រក្សាទុកដោយជោគជ័យ!");
      setTimeout(() => {
        window.location.href = "http://localhost:8012/admin/user-list";
      }, 3000);
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data.data || {};
        console.log("Error:", error.response.data.data);

        if (error.response.data.data.email[0] != null) {
          Toastify("warning", "អ៊ីមែលមានរួចហើយ");
        } else {
          Toastify("warning", "ទិន្នន័យមិនត្រឹមត្រូវ!");
        }
        setErrors(backendErrors);
      } else {
        Toastify("error", "ការរក្សាទុកបានបរាជ័យ!");
      }
      console.error("Submission error:", error);
    }
  };

  return (
    <>
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
                / បង្កើត
              </label>
            </Link>
            <div className="hidden sm:block ml-auto">
              <DateKhmer />
            </div>
          </div>

          <div className="flex flex-row gap-x-2 items-center mt-7">
            <div>
              <CreateIcon name="create" size="24" color="#2a4f8a" />
            </div>
            <div>
              <label
                className="text-md font-bold pt-1 text-[#2a4f8a] "
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                បង្កើត
              </label>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className=" relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="p-5">
            <form action="" id="frmCreateUser">
              <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full gap-3">
                {/* Sub content one */}
                <div className="mr-1">
                  <div className="">
                    <Input
                      label="ឈ្មោះខ្មែរ"
                      type="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="username_kh"
                      name="username_kh"
                      value={formData.username_kh}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      classNname={`${errors.username_kh && "border-red-500"}`}
                      star="true"
                    />
                  </div>
                  <div className="mt-3">
                    <Input
                      label="មុខតំណែង"
                      type="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      classNname=""
                    />
                  </div>
                  <div className="mt-3">
                    <Select
                      options={genderOptions}
                      label="ភេទ"
                      id="sex"
                      name="sex"
                      value={formData.sex}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      classNname=""
                    />
                  </div>
                  <div className="mt-3">
                    <Input
                      label="ពាក្យសម្ងាត់​(លំនាំដើម)"
                      type="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="passwords"
                      name="passwords"
                      value="Fmi$2025"
                      disabled={true}
                      readOnly
                    />
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value="Fmi$2025"
                      readOnly
                      hidden
                    />
                  </div>
                </div>
                {/* Sub content two */}
                <div className="ml-1">
                  <div className="">
                    <Input
                      label="លេខទូរស័ព្ទ"
                      text="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      classNname=""
                    />
                  </div>
                  <div className="mt-3">
                    <Input
                      label="អ៊ីមែល"
                      type="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      star="true"
                      classNname={`${errors.email && "border-red-500"}`}
                    />
                  </div>
                  <div className=" mt-3">
                    <Select
                      options={roleOptions}
                      label="តួនាទី"
                      id="role"
                      name="role"
                      value={formData.role}
                      classNname={`${errors.role && "border-red-500"}`}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      star="true"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* button */}
          <div className=" absolute sm:col-span-2 text-end right-5 bottom-5 ">
            {/* <div className="flex sm:col-span-2 ml-auto justify-end mr-5 mb-5"> */}
            <div className=" flex gap-3">
              {" "}
              <Link to="/admin/user-list">
                <Button color="red" text="បោះបង់" className="" />
              </Link>
              <div>
                {" "}
                <Link to="">
                  <Button
                    color="blue"
                    text="រក្សាទុក"
                    className=""
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
