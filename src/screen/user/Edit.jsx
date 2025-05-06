import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "../../icons/svg/Home";
import EditIcon from "../../icons/svg/Edit";
import Input from "../../style/tailwind/Input";
import Button from "../../style/tailwind/Button";
import TextArea from "../../style/tailwind/TextArea";
import DateKhmer from "../../components/DateKhmer";
import Select from "../../style/tailwind/Select";
import Toastify from "../../components/Toastify";
import api from "../../api";

const Edit = () => {
  // Get user id
  const { id } = useParams();
  const [user, setUser] = useState([]);
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
  // Word class English
  const wordClassEn = [
    { label: "Noun", value: "NOUN" },
    { label: "Verb", value: "VERB" },
    { label: "Adjective", value: "ADJECTIVE" },
    { label: "Adverb", value: "ADVERB" },
    { label: "Pronoun", value: "PRONOUN" },
    { label: "Preposition", value: "PREPOSITION" },
    { label: "Conjunction", value: "CONJUNCTION" },
    { label: "Interjection", value: "INTERJECTION" },
  ];
  // Fetch data from API
  useEffect(() => {
    const token = localStorage.getItem("access");
    const fetchUserDetails = async () => {
      if (!token || !id) return;

      try {
        const response = await api.get(
          `/api/dictionary/staging/detail?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setFormData({
          word_kh: response.data.data.word_kh || "",
          word_en: response.data.data.word_en || "",
          word_kh_type: response.data.data.word_kh_type || "",
          word_en_type: response.data.data.word_en_type || "",
          word_kh_definition: response.data.data.word_kh_definition || "",
          word_en_definition: response.data.data.word_en_definition || "",
          pronunciation_kh: response.data.data.pronunciation_kh || "",
          pronunciation_en: response.data.data.pronunciation_en || "",
          example_sentence_kh: response.data.data.example_sentence_kh || "",
          example_sentence_en: response.data.data.example_sentence_en || "",
        });
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };
    fetchUserDetails();
  }, [id]);
  // use state data form
  const [formData, setFormData] = useState({
    word_kh: "",
    word_en: "",
    word_kh_type: "",
    word_en_type: "",
    word_kh_definition: "",
    word_en_definition: "",
    pronunciation_kh: "",
    pronunciation_en: "",
    example_sentence_kh: "",
    example_sentence_en: "",
  });
  // State for errors
  const [errors, setErrors] = useState({
    word_kh: "",
    word_en: "",
    word_kh_type: "",
    word_en_type: "",
    word_kh_definition: "",
    word_en_definition: "",
  });
  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Form validation (for front-end)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.word_kh) newErrors.word_kh = "អ៊ីមែលត្រូវតែបញ្ចូល";
    if (!formData.word_en) newErrors.word_en = "លេខសម្គាល់តែបញ្ចូល";
    if (!formData.word_kh_type) newErrors.word_kh_type = "លេខសម្គាល់តែបញ្ចូល";
    if (!formData.word_en_type) newErrors.word_en_type = "លេខសម្គាល់តែបញ្ចូល";
    if (!formData.word_kh_definition)
      newErrors.word_kh_definition = "លេខសម្គាល់តែបញ្ចូល";
    if (!formData.word_en_definition)
      newErrors.word_en_definition = "លេខសម្គាល់តែបញ្ចូល";

    return newErrors;
  };
  // Submit form
  const handleClick = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      word_kh: "",
      word_en: "",
      word_kh_type: "",
      word_en_type: "",
      word_kh_definition: "",
      word_en_definition: "",
    });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await api.put(`/api/dictionary/staging/update?id=${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      Toastify("success", "រក្សាទុកដោយជោគជ័យ!");
      setTimeout(() => {
        window.location.href = "http://localhost:8012/user/word-list";
      }, 2000);
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data.data || {};
        Toastify("warning", "ទិន្នន័យមិនត្រឹមត្រូវ!");
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
            <Link to="/user/word-list">
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
                / កែប្រែ
              </label>
            </Link>
            <div className="hidden sm:block ml-auto">
              {" "}
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
                  <Select
                    options={wordClassEn}
                    label="ថ្នាក់ពាក្យអង់គ្លេស"
                    id="word_en_type"
                    name="word_en_type"
                    value={formData.word_en_type}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    classNname={`${errors.word_en_type && "border-red-500"}`}
                    star="true"
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
              <Link to="/user/word-list">
                <Button color="red" text="បោះបង់" className="" />
              </Link>
              <div>
                {" "}
                <Link to="/user/word-list">
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

export default Edit;
