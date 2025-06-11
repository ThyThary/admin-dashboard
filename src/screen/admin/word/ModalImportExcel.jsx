import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "../../../config/api";
import Toastify from "../../../components/Toastify";
import Button from "../../../style/tailwind/Button";
import WEB_BASE_URL from "../../../config/web";
function ModalImportExcel({ isOpen, btnNo }) {
  const [data, setData] = useState([]);
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState("");
  const [tableError, setTableError] = useState("");
  const [textError, setTextError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const handleFileChange = (e) => {
    setIsLoading(false);
    const files = e.target.files[0];
    console.log(files);
    if (!files) {
      setFile(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      setData(jsonData);
      setFile(files);
      setFileError("");
    };

    reader.readAsBinaryString(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setFileError("ត្រូវការឯកសារ Excel");
      return;
    }

    // Submit logic here (e.g., API call)
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access");
      const data = await api.post(
        "/api/dictionary/staging/bulk_input/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 attach token here
            ContentType: "multipart/form-data",
          },
        }
      );
      console.log("Data:", data.status);
      if (data.status === 200) {
        Toastify("success", "រក្សាទុកដោយជោគជ័យ!");
        setTimeout(() => {
          window.location.href = `${WEB_BASE_URL}/admin/word-list`;
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error.response) {
        console.log("Error: ", error.response);
        const backendErrors = error.response.data.data.failed_entries || {};
        if (error.response.data.data.failed_entries[0].word_kh != null) {
          Toastify("warning", "ពាក្យមានរួចហើយ");
          console.log("Back-end errors: ", backendErrors);
          setTableError(backendErrors);
          setTextError(backendErrors.map((items) => items.row + ", "));
          setIsLoading(false);
        } else {
          Toastify("warning", "ទិន្នន័យមិនត្រឹមត្រូវ!");
        }
      } else {
        Toastify("error", "ការរក្សាទុកបានបរាជ័យ!");
      }
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
        <div className="bg-white w-2/3 rounded-lg shadow-lg border border-[#2f7447] max-h-[600px] min-w-[400px]">
          <div className="w-full mx-5 py-2 !text-left">
            <label
              style={{ fontFamily: "Hanuman, sans-serif" }}
              className=" font-bold text-lg text-[#2a4f8a]"
            >
              នាំឯកសារ <span style={{ fontFamily: "Moul,serif" }}>Excel</span>{" "}
              ចូល
            </label>
          </div>
          <div className="!border-b-1 border-[#2f7447]"></div>
          <div className="mx-5 mt-5">
            <div className="flex flex-row justify-center gap-3">
              {/* Sub content  */}
              <div className="w-full">
                <div className="flex mt-3 mb-3 gap-3 ">
                  <div className="w-full ">
                    <label className="block">
                      <span className="sr-only">Choose Excel File</span>
                      <input
                        type="file"
                        accept=".xlsx"
                        // name="file"
                        // id="file"
                        onChange={handleFileChange}
                        className={`block w-full text-sm text-gray-500
            file:mr-4 file:py-3 file:px-2 file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-green-700
            hover:file:bg-blue-100  border border-[#2f7447] rounded-lg focus:outline-none hover:border-1 ${
              fileError && "border-red-500"
            }`}
                      />
                    </label>
                  </div>
                  <div className="mt-2">
                    <a href="/excel/word_template.xlsx" download>
                      <span
                        className=" bg-green-100 px-2 py-2.5 rounded-md cursor-pointer text-green-900 border border-[#2f7447] whitespace-nowrap"
                        style={{
                          fontFamily: "Hanuman, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        ទាញយកគំរូ
                      </span>
                    </a>
                  </div>
                </div>
                <p className=" !text-red-500 text-left tracking-[1px] !text-xs font-hanuman mt-1">
                  {fileError}
                </p>
                {data.length > 0 && (
                  <div
                    className={`overflow-y-auto border ${
                      tableError && "!border-red-500"
                    } rounded max-h-[390px]`}
                  >
                    <table
                      className={`min-w-full divide-y divide-gray-200 text-sm `}
                    >
                      <thead className="bg-gray-100">
                        <tr>
                          {data[0].map((header, idx) => (
                            <th
                              style={{
                                fontFamily: "Moul,serif",
                                fontSize: "12px",
                              }}
                              key={idx}
                              className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {data.slice(1).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <td
                                key={colIndex}
                                className="px-4 py-2 text-gray-800 whitespace-nowrap"
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <span
                  className=" text-red-500 text-xs"
                  style={{ fontFamily: "Hanuman, sans-serif" }}
                >
                  {tableError && "មានបញ្ហានៅ​ ល.រ​"}{" "}
                </span>
                <span
                  className=" text-red-500 text-xs"
                  style={{ fontFamily: "Hanuman, sans-serif" }}
                >
                  {tableError && textError}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`flex w-full gap-3 justify-center mb-5  ${
              fileError != "" ? "mt-1" : "mt-5"
            }`}
          >
            {" "}
            <div>{btnNo}</div>
            <div>
              <Button
                color="blue"
                text="រក្សាទុក"
                className="px-3"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalImportExcel;
