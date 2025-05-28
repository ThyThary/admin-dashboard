import React, { useState } from "react";
import Input from "../style/tailwind/Input";
import Toastify from "../components/Toastify";
import api from "../config/api";
import CryptoJS from "crypto-js"; // You'll need to install this package
import Button from "../style/tailwind/Button";
import WEB_BASE_URL from "../config/web";
// Function to encrypt data using OpenSSL-compatible AES-256 encryption
const encryptData = (data) => {
  try {
    // Get current year and month for dynamic key generation
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");

    // Use the same key template as in the backend
    const keyTemplate =
      "Ajv!ndfjkhg0${current_year}g0sno%eu$rtg@nejog${current_month}";
    const dynamicKey = keyTemplate
      .replace("${current_year}", currentYear)
      .replace("${current_month}", currentMonth);

    // Generate random 8-byte salt
    const salt = CryptoJS.lib.WordArray.random(8);

    // Create key and IV using OpenSSL EVP_BytesToKey derivation
    const keyAndIv = deriveKeyAndIv(dynamicKey, salt);
    const key = keyAndIv.key;
    const iv = keyAndIv.iv;

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    // Format as "Salted__" + salt + ciphertext
    const saltedPrefix = CryptoJS.enc.Latin1.parse("Salted__");
    const encryptedBytes = encrypted.ciphertext;

    // Combine all parts
    const combined = CryptoJS.lib.WordArray.create()
      .concat(saltedPrefix)
      .concat(salt)
      .concat(encryptedBytes);

    // Return as base64
    return combined.toString(CryptoJS.enc.Base64);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// OpenSSL KDF implementation (EVP_BytesToKey with MD5, one iteration)
const deriveKeyAndIv = (password, salt) => {
  let key = CryptoJS.lib.WordArray.create();
  let iv = CryptoJS.lib.WordArray.create();

  // Convert password to WordArray if it's a string
  const passwordWords =
    typeof password === "string" ? CryptoJS.enc.Utf8.parse(password) : password;

  // First iteration
  let md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create().concat(passwordWords).concat(salt)
  );

  // Use first 16 bytes for key
  key = key.concat(md5Hash);

  // Second iteration for more key material
  md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create()
      .concat(md5Hash)
      .concat(passwordWords)
      .concat(salt)
  );

  // Use next 16 bytes for key
  key = key.concat(md5Hash);

  // Third iteration for IV
  md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create()
      .concat(md5Hash)
      .concat(passwordWords)
      .concat(salt)
  );

  // Use first 16 bytes of third hash for IV
  iv = md5Hash;

  return {
    key: CryptoJS.lib.WordArray.create(key.words.slice(0, 8)), // 32 bytes for key
    iv: CryptoJS.lib.WordArray.create(iv.words.slice(0, 4)), // 16 bytes for IV
  };
};

const ChangePasword = ({ isOpen, btnNo }) => {
  let lower = /^(?=.*[a-z]).+$/;
  let upper = /^(?=.*[A-Z]).+$/;
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user.role;
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
  // console.log("Error", errors);
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
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e, setIsLoading) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access");
      // Encrypt password fields
      const encryptedData = {
        current_password: encryptData(formData.current_password),
        new_password: encryptData(formData.new_password),
        confirm_password: encryptData(formData.confirm_password),
      };

      console.log("Original data:", {
        current_password: "***HIDDEN***",
        new_password: "***HIDDEN***",
        confirm_password: "***HIDDEN***",
      });
      console.log("Encrypted data:", encryptedData);

      await api.post(`/api/users/change-password/`, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
          "Content-Type": "application/json",
        },
      });

      Toastify("success", "ប្ដូរពាក្យសម្ងាត់ដោយជោគជ័យ!");
      setTimeout(() => {
        if (userRole === "USER") {
          window.location.href = `${WEB_BASE_URL}/user/word-list`;
        } else {
          window.location.href = `${WEB_BASE_URL}/admin/user-list`;
        }
      }, 2000);
    } catch (error) {
      if (error.response) {
        // const backendErrors = error.response.data.data || {};
        const split = error.response.data.message.split(" ");
        if (split[0] == "current_password") {
          setErrors({
            current_password: "ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ",
          });
        } else {
          setErrors({
            confirm_password:
              "បញ្ជាក់ពាក្យសម្ងាត់មិនត្រឹមត្រូវនិង​​​ពាក្យសម្ងាត់ថ្មី",
          });
        }
        setIsLoading(false);
        // setErrors(backendErrors);
      } else {
        Toastify("error", "ការប្ដូរពាក្យសម្ងាត់បានបរាជ័យ!");
      }
      setIsLoading(false);
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-1/3 rounded-lg shadow-lg border border-[#2f7447]">
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
            {/* <button onClick={(e) => handleClick(e)}>
              <div>{btnOk}</div>
            </button> */}
            <div>
              <Button
                color="blue"
                text="រក្សាទុក"
                className="px-3"
                onClick={(e) => handleClick(e, setIsLoading)}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasword;
