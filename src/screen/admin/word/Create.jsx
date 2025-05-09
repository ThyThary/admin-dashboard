import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
const HomeIcon = lazy(() => import("../../../icons/svg/Home"));
const CreateIcon = lazy(() => import("../../../icons/svg/Create"));
const Input = lazy(() => import("../../../style/tailwind/Input"));
const Select = lazy(() => import("../../../style/tailwind/Select"));
const Button = lazy(() => import("../../../style/tailwind/Button"));
const TextArea = lazy(() => import("../../../style/tailwind/TextArea"));
import DateKhmer from "../../../components/DateKhmer";
import Toastify from "../../../components/Toastify";

const Create = () => {
  const [wordClassEn, setWordClassEn] = useState("");
  // Word class Khmer
  const wordClassKh = [
    { label: "នាម", value: "នាម" },
    { label: "កិរិយាសព្ទ", value: "កិរិយាសព្ទ" },
    { label: "គុណនាម", value: "គុណនាម" },
    { label: "គុណកិរិយា", value: "គុណកិរិយា" },
    { label: "សព្វនាម", value: "សព្វនាម" },
    { label: "ធ្នាក់", value: "ធ្នាក់" },
    { label: "ឈ្នាប់", value: "ឈ្នាប់" },
    { label: "ឧទានសព្ទ", value: "ឧទានសព្ទ" },
  ];

  // use state data form
  const [formData, setFormData] = useState({
    word_kh: "",
    word_kh_type: "",
    word_kh_definition: "",
    word_en: "",
    word_en_type: wordClassEn,
    word_en_definition: "",
    pronunciation_kh: "",
    pronunciation_en: "",
    example_sentence_kh: "",
    example_sentence_en: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    word_kh: "",
    word_kh_type: "",
    word_kh_definition: "",
    word_en: "",
    word_en_definition: "",
  });

  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const englishOnlyRegex = /^[A-Za-z0-9.@!@#$%^&*+=_-\s]*$/;
    const khmerOnlyRegex = /^[\u1780-\u17FF\s]+$/;
    if (
      (name === "word_en" ||
        name === "word_en_type" ||
        name === "word_en_definition" ||
        name === "pronunciation_en") &&
      !englishOnlyRegex.test(value)
    ) {
      return;
    } else if (
      (name === "word_kh" ||
        name === "word_kh_type" ||
        name === "word_kh_definition" ||
        name === "pronunciation_kh") &&
      !khmerOnlyRegex.test(value)
    ) {
      return;
    } else {
      var wordEn;
      if (name === "word_kh_type") {
        // Get English by Khmer
        const wordClassKhmer = e.target.value;
        switch (true) {
          case wordClassKhmer === "នាម":
            wordEn = "NOUN";
            break;
          case wordClassKhmer === "កិរិយាសព្ទ":
            wordEn = "VERB";
            break;
          case wordClassKhmer === "គុណនាម":
            wordEn = "ADJECTIVE";
            break;
          case wordClassKhmer === "គុណកិរិយា":
            wordEn = "ADVERB";
            break;
          case wordClassKhmer === "សព្វនាម":
            wordEn = "PRONOUN";
            break;
          case wordClassKhmer === "ធ្នាក់":
            wordEn = "PREPOSITION";
            break;
          case wordClassKhmer === "ឈ្នាប់":
            wordEn = "CONJUNCTION";
            break;
          case wordClassKhmer === "ឧទានសព្ទ":
            wordEn = "INTERJECTION";
            break;
          default:
        }
        setWordClassEn(wordEn);
        setFormData((prev) => ({
          ...prev,
          word_en_type: wordEn,
        }));
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Form validation (for front-end)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.word_kh) newErrors.word_kh = "Error";
    if (!formData.word_kh_type) newErrors.word_kh_type = "Error";
    if (!formData.word_kh_definition) newErrors.word_kh_definition = "Error";
    if (!formData.word_en) newErrors.word_en = "Error";
    if (!formData.word_en_definition) newErrors.word_en_definition = "Error";
    if (
      !formData.word_kh ||
      !formData.word_kh_type ||
      !formData.word_kh_definition ||
      !formData.word_en ||
      !formData.word_en_definition
    ) {
      Toastify("warning", "បញ្ចូលទិន្នន័យ");
    }
    return newErrors;
  };
  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({
      word_kh: "",
      word_kh_type: "",
      word_kh_definition: "",
      word_en: "",
      word_en_definition: "",
    });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      const data = await api.post("/api/dictionary/staging/create/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      console.log("Data: ", data);
      if (data.data.responseCode === 201) {
        Toastify("success", "រក្សាទុកដោយជោគជ័យ!");
        setTimeout(() => {
          window.location.href = "http://localhost:8012/admin/word-list";
        }, 2000);
      }
    } catch (error) {
      console.log("Error:", error.response.data.responseCode);
      if (error.response) {
        const backendErrors = error.response.data || {};
        if (error.response.data.responseCode == 400) {
          Toastify("warning", "ពាក្យមានរួចហើយ!");
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
            <Link to="/admin/word-list">
              <label
                className="text-sm cursor-pointer"
                style={{ fontFamily: "Hanuman, sans-serif" }}
              >
                / ពាក្យ
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
          {/* Button create */}
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
        <div className="relative bg-white overflow-y-auto m-5 shadow-md rounded-md min-h-[72vh] max-h-[72vh]">
          <div className="p-5">
            <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full gap-3">
              {/* Sub content one */}
              <div className="mr-1">
                <div className="">
                  <Input
                    label="ពាក្យខ្មែរ"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="word_kh"
                    name="word_kh"
                    value={formData.word_kh}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${errors.word_kh && "border-red-500"}`}
                    star="true"
                  />
                </div>
                <div className="mt-3">
                  <Select
                    options={wordClassKh}
                    label="ថ្នាក់ពាក្យខ្មែរ"
                    id="word_kh_type"
                    name="word_kh_type"
                    value={formData.word_kh_type}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${errors.word_kh_type && "border-red-500"}`}
                    star="true"
                  />
                </div>
                <div className="mt-3">
                  <Input
                    label="បញ្ចេញសម្លេងខ្មែរ"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="pronunciation_kh"
                    name="pronunciation_kh"
                    value={formData.pronunciation_kh}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="និយមន័យខ្មែរ"
                    rows="4"
                    id="word_kh_definition"
                    name="word_kh_definition"
                    value={formData.word_kh_definition}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                    classNname={`${
                      errors.word_kh_definition && "border-red-500"
                    }`}
                    star="true"
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="ឧទាហរណ៍ខ្មែរ"
                    rows="4"
                    id="example_sentence_kh"
                    name="example_sentence_kh"
                    value={formData.example_sentence_kh}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                    classNname=""
                  />
                </div>
              </div>
              {/* Sub content two */}
              <div className="ml-1">
                <div className="">
                  <Input
                    label="ពាក្យអង់គ្លេស"
                    text="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="word_en"
                    name="word_en"
                    value={formData.word_en}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${errors.word_en && "border-red-500"}`}
                    star="true"
                  />
                </div>
                <div className="mt-3">
                  {/* hide to get data from select word class khmer*/}
                  <input
                    type="text"
                    name="word_en_type"
                    id="word_en_type"
                    value={wordClassEn}
                    className="hidden"
                  />
                  {/* Only show */}
                  <Input
                    label="ថ្នាក់ពាក្យអង់គ្លេស"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="word_en_types"
                    name="word_en_types"
                    value={wordClassEn}
                    star="true"
                    disabled={true}
                  />
                </div>
                <div className="mt-3">
                  <Input
                    label="បញ្ចេញសម្លេងអង់គ្លេស"
                    type="text"
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ"
                    id="pronunciation_en"
                    name="pronunciation_en"
                    value={formData.pronunciation_en}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname=""
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="និយមន័យអង់គ្លេស"
                    rows="4"
                    id="word_en_definition"
                    name="word_en_definition"
                    value={formData.word_en_definition}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                    classNname={`${
                      errors.word_en_definition && "border-red-500"
                    }`}
                    star="true"
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="ឧទាហរណ៍អង់គ្លេស"
                    rows="4"
                    id="example_sentence_en"
                    name="example_sentence_en"
                    value={formData.example_sentence_en}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="បញ្ចូលទិន្នន័យនៅទីនេះ ..."
                    classNname=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className=" flex justify-end  sm:col-span-2 text-end mr-5 mb-5">
            <div className=" flex gap-3">
              {" "}
              <Link to="/admin/word-list">
                <Button color="red" text="បោះបង់" className="" />
              </Link>
              <div>
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
    </>
  );
};

export default Create;
