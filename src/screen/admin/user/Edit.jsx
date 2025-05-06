import React, { useState, useEffect } from "react";
import HomeIcon from "../../../icons/svg/Home";
import EditIcon from "../../../icons/svg/Edit";
import { Link, useParams } from "react-router-dom";
import Input from "../../../style/tailwind/Input";
import Select from "../../../style/tailwind/Select";
import Button from "../../../style/tailwind/Button";
import DateKhmer from "../../../components/DateKhmer";
import Toastify from "../../../components/Toastify";
import api from "../../../api";
const Edit = () => {
  // Get user id
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("access");
  const userRole = JSON.parse(localStorage.getItem("user"));
  // Fetch data from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token || !id) return;

      try {
        const response = await api.get(`/api/users/detail?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          username_kh: response.data.data.username_kh || "",
          email: response.data.data.email || "",
          role: response.data.data.role || "",
          sex: response.data.data.sex || "",
          staff_id: response.data.data.staff_id || "",
          position: response.data.data.position || "",
          phone_number: response.data.data.phone_number || "",
        });
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };
    fetchUserDetails();
  }, [id]);

  // use state data form
  const [formData, setFormData] = useState({
    username_kh: "",
    email: "",
    role: "",
    sex: "",
    staff_id: "",
    position: "",
    phone_number: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    email: "",
    role: "",
  });
  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const englishOnlyRegex = /^[A-Za-z0-9.@!@#$%^&*+=_-\s]*$/;
    const khmerOnlyRegex = /^[\u1780-\u17FF\s]+$/;
    const numberOnlyRegex = /^[0-9]*$/;
    if (name === "email" && !englishOnlyRegex.test(value)) {
      return;
    } else if (name === "phone_number" && !numberOnlyRegex.test(value)) {
      return;
    } else if (
      (name === "username_kh" || name === "position") &&
      !khmerOnlyRegex.test(value)
    ) {
      return;
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    setErrors({ email: "", sex: "", role: "" });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await api.patch(`/api/users/update?id=${id}`, formData, {
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
  //Gender value
  const genderOptions = [
    { label: "ប្រុស", value: "MALE" },
    { label: "ស្រី", value: "FEMALE" },
  ];

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
      {user ? (
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
                  / កែប្រែ
                </label>
              </Link>
              <div className="hidden sm:block ml-auto">
                <DateKhmer />
              </div>
            </div>

            <div className="flex flex-row gap-x-2 items-center mt-7">
              <div>
                <EditIcon name="edit" size="25" color="#2a4f8a" />
              </div>
              <div>
                <label
                  className="text-md font-bold pt-1 text-[#2a4f8a] "
                  style={{ fontFamily: "Hanuman, sans-serif" }}
                >
                  កែប្រែ
                </label>
              </div>
            </div>
          </div>
          <div className="relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
            <div className="p-5">
              <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full gap-3">
                {/* Sub content one */}
                <div className="mr-1">
                  <div className="">
                    <input
                      type="text"
                      name="staff_id"
                      id="staff_id"
                      value={formData.staff_id}
                      hidden
                    />
                    <Input
                      label="លេខសម្គាល់"
                      type="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="staff_ids"
                      name="staff_ids"
                      value={formData.staff_id}
                      star="true"
                      disabled={true}
                    />
                  </div>
                  <div className=" mt-3">
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
                      style={{ fontFamily: "Hanuman, sans-serif" }}
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
                    />
                  </div>
                  <div className=" mt-3">
                    {(() => {
                      if (userRole.role === "SUPERUSER") {
                        const roleOptions = [
                          { label: "អ្នកប្រើប្រាស់", value: "USER" },
                          { label: "អ្នកគ្រប់គ្រង", value: "ADMIN" },
                          {
                            label: "អ្នកគ្រប់គ្រងជាន់ខ្ពស់",
                            value: "SUPERUSER",
                          },
                        ];
                        return (
                          <Select
                            options={roleOptions}
                            label="តួនាទី"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            classNname={`${errors.role && "border-red-500"}`}
                            star="true"
                          />
                        );
                      } else {
                        const roleOptions = [
                          { label: "អ្នកប្រើប្រាស់", value: "USER" },
                          { label: "អ្នកគ្រប់គ្រង", value: "ADMIN" },
                        ];
                        return (
                          <Select
                            options={roleOptions}
                            label="តួនាទី"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            classNname={`${errors.role && "border-red-500"}`}
                            star="true"
                          />
                        );
                      }
                    })()}
                  </div>
                </div>
                {/* Sub content two */}
                <div className="ml-1">
                  <div className="">
                    <Input
                      label="ឈ្មោះ"
                      text="text"
                      placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                      id="username_kh"
                      name="username_kh"
                      value={formData.username_kh}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="mt-3">
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
                      style={{ fontFamily: "Hanuman, sans-serif" }}
                      classNname={`${errors.email && "border-red-500"}`}
                      star="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* button */}
            <div className="md:absolute md:bottom-5 md:right-5 flex mr-5 mb-5 md:mr-0 md:mb-0 justify-end sm:col-span-2 text-end">
              {" "}
              <div className=" flex gap-3">
                {" "}
                <Link to="/admin/user-list">
                  <Button color="red" text="បោះបង់" className="" />
                </Link>
                <div>
                  {" "}
                  <Button
                    color="blue"
                    text="រក្សាទុក"
                    className=""
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
};

export default Edit;
