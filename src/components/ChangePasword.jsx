import React, { useState } from "react";
import Input from "../style/tailwind/Input";
import Toastify from "../components/Toastify";
import api from "../api";

const ChangePasword = ({ isOpen, btnNo, btnOk, id }) => {
  let lower = /^(?=.*[a-z]).+$/;
  let upper = /^(?=.*[A-Z]).+$/;
  if (!isOpen) return null;
  // use state data form
  const [formData, setFormData] = useState({
    reason: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const englishOnlyRegex = /^[A-Za-z0-9.@!@#$%^&*+=_-\s]*$/;
    if (
      (name === "current_password" ||
        name === "new_password" ||
        name === "confirm_password") &&
      !englishOnlyRegex.test(value)
    ) {
      return setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));
    } else {
      return setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // Form validation (for front-end)

  const validateForm = () => {
    // Required field
    const newErrors = {};
    if (!formData.current_password)
      newErrors.current_password = "ត្រូវការពាក្យសម្ងាត់បច្ចុប្បន្ន";
    if (!formData.confirm_password)
      newErrors.confirm_password = "ត្រូវកាបញ្ជាក់ពាក្យសម្ងាត់";

    //  Strong password
    switch (true) {
      case formData.new_password == undefined:
        newErrors.new_password = "ត្រូវកាពាក្យសម្ងាត់ថ្មី";
        break;
      case formData.new_password.length < 8:
        newErrors.new_password = "ពាក្យសម្ងាត់ថ្មីត្រូវមាន៨ខ្ទង់យ៉ាងតិច";
        break;
      case !/[0-9]/.test(formData.new_password):
        newErrors.new_password = "ពាក្យសម្ងាត់ថ្មីត្រូវមានលេខយ៉ាងតិចមួយ";
        break;
      case lower.test(formData.new_password) != true:
        newErrors.new_password = "ពាក្យសម្ងាត់ថ្មីត្រូវមានអក្សរតូចយ៉ាងតិចមួយ";
        break;
      case upper.test(formData.new_password) != true:
        newErrors.new_password = "ពាក្យសម្ងាត់ថ្មីត្រូវមានអក្សរធំយ៉ាងតិចមួយ";
        break;
      case !/[!@#$%^&*\]]/.test(formData.new_password):
        newErrors.new_password = "ពាក្យសម្ងាត់ថ្មីត្រូវមានសញ្ញាយ៉ាងតិចមួយ";
        break;
      case formData.confirm_password &&
        formData.new_password != formData.confirm_password:
        newErrors.confirm_password =
          "បញ្ជាក់ពាក្យសម្ងាត់មិនត្រឹមត្រូវនិង​​​ពាក្យសម្ងាត់ថ្មី";
      default:
    }
    return newErrors;
  };
  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ current_password: "", new_password: "", confirm_password: "" });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await api.post(`/api/users/change-password/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      Toastify("success", "បដិសេធដោយជោគជ័យ!");
      setTimeout(() => {
        window.location.href = "http://localhost:8012/admin/controller-list";
      }, 2000);
    } catch (error) {
      if (error.response) {
        // const backendErrors = error.response.data.data || {};
        const split = error.response.data.message.split(" ");
        if (split[0] == "current_password") {
          setErrors({
            current_password: "ពាក្យសម្ងាត់ថ្មីមិនត្រឹមត្រូវ",
          });
        } else {
          setErrors({
            confirm_password:
              "បញ្ជាក់ពាក្យសម្ងាត់មិនត្រឹមត្រូវនិង​​​ពាក្យសម្ងាត់ថ្មី",
          });
        }
        // setErrors(backendErrors);
      } else {
        Toastify("error", "ការរបដិសេធបានបរាជ័យ!");
      }
      console.error("Submission error:", error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-2/5 rounded-lg shadow-lg border border-[#2f7447]">
          <div className="w-full mx-5 py-2 !text-left">
            <label
              style={{ fontFamily: "Hanuman, sans-serif" }}
              className=" font-bold text-lg text-[#2a4f8a]"
            >
              ប្ដូរពាក្យសម្ងាត់
            </label>
          </div>
          <div className="!border-b-1 border-[#2f7447]"></div>
          <div className="mx-5 mt-5">
            <div className="flex flex-row justify-center gap-3">
              {/* Sub content  */}
              <div className="w-full">
                <div className="">
                  <Input
                    label="ពាក្យសម្ងាត់បច្ចុប្បន្ន"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="current_password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${
                      errors.current_password && "border-red-500"
                    }`}
                    star="true"
                  />
                  <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman mt-1">
                    {errors.current_password}
                  </p>
                </div>
                <div
                  className={`${
                    errors.current_password == "" ? "mt-3" : "mt-0"
                  }`}
                >
                  <Input
                    label="ពាក្យសម្ងាត់ថ្មី"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="new_password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${errors.new_password && "border-red-500"}`}
                    star="true"
                  />
                  <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman mt-1">
                    {errors.new_password}
                  </p>
                </div>
                <div
                  className={`${errors.new_password != "" ? "mt-0" : "mt-3"}`}
                >
                  <Input
                    label="បញ្ជាក់ពាក្យសម្ងាត់"
                    type="password"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${
                      errors.confirm_password && "border-red-500"
                    }`}
                    star="true"
                  />
                  <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman mt-1">
                    {errors.confirm_password}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex w-full gap-3 justify-center mb-5 ${
              errors.confirm_password == "" ? "mt-5" : "mt-2"
            }`}
          >
            {" "}
            <div>{btnNo}</div>
            <button onClick={(e) => handleClick(e)}>
              <div>{btnOk}</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasword;
