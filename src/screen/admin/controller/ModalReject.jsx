import React, { useState } from "react";
import TextArea from "../../../style/tailwind/TextArea";
import Toastify from "../../../components/Toastify";
import api from "../../../api";

const ModalReject = ({
  isOpen,
  btnNo,
  btnOk,
  routeWeb,
  routeAPI,
  routeAPIType,
  id,
  text,
}) => {
  console.log(id);
  if (!isOpen) return null;
  // use state data form
  const [formData, setFormData] = useState({
    reason: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    reason: "",
  });

  //Handle input
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      reason: value,
    }));
  };
  // Form validation (for front-end)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.reason) newErrors.reason = "ត្រូវការមូលហេតុ";
    return newErrors;
  };
  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ reason: "" });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await api.post(`/api/dictionary/staging/reject?id=${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      Toastify("success", "បដិសេធដោយជោគជ័យ!");
      setTimeout(() => {
        window.location.href = "http://localhost:8012/admin/controller-list";
      }, 3000);
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data.data || {};
        Toastify("warning", "ទិន្នន័យមិនត្រឹមត្រូវ!");
        setErrors(backendErrors);
      } else {
        Toastify("error", "ការរបដិសេធបានបរាជ័យ!");
      }
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-[#2f7447]">
        <div className=" flex justify-center">
          <p
            className="text-gray-600 font-bold"
            style={{
              fontFamily: "Hanuman, sans-serif",
              fontSize: "25px",
              color: "#2a4f8a",
            }}
          >
            តើអ្នកប្រាកដទេ?
          </p>
        </div>
        <div className="  justify-center items-center min-h-25 max-h-25">
          <div className="">
            <TextArea
              label="មូលហេតុ"
              rows="3"
              id="word_kh_definition"
              name="word_kh_definition"
              value={formData.reason}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
              classNname={`text-sm ${errors.reason && "border-red-500"}`}
              star="true"
            />
          </div>
          <p className=" !text-red-500 text-left tracking-[1px] !text-xs font-hanuman mt-1">
            {errors.reason}
          </p>
        </div>
        <div className="flex w-full gap-3 justify-center mt-7">
          <div>{btnNo}</div>
          <button onClick={(e) => handleClick(e)}>
            <div>{btnOk}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalReject;
