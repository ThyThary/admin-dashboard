import React, { useState } from "react";
import "./login.css";
import validatorEnglish from "../../validate/english";
import handleClickSubmit from "../../validate/email";
import Svg from "../../icons/svg/Svg";
import Button from "../../style/tailwind/Button";
//User log in account
const Login = () => {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [unauthorizedError, setUnauthorizedError] = useState("");

  return (
    <>
      <div className="flex h-screen font-serif bg-slate-100 ">
        <div className="flex w-full justify-center items-center text-center">
          <div className=" w-[300px] h-[350px] bg-white rounded-xl shadow-xl">
            <div className="flex mt-3 justify-center">
              {/* Icons */}
              <Svg name="userStroke" size="80" color="#2A4F8A" />
            </div>
            <div className="mt-1">
              <label htmlFor="employeefrm" className="moul-light-title ">
                ចូលប្រើប្រាស់ប្រព័ន្ធ
              </label>
            </div>
            <form className="grid grid-cols-1 mt-1">
              <p className=" text-red-500 text-center tracking-[1px] !text-xs siemreap-regular">
                {unauthorizedError}
              </p>
              <div className="grid justify-center">
                <input
                  className={`input-box line-hover font-human
                    ${userNameError == "" ? "" : "!border-red-500"}
                    `}
                  type="text"
                  name="userName"
                  id="userName"
                  value={userName}
                  placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    validatorEnglish(e, setUserName);
                  }}
                />
                <p className=" text-red-500 text-center tracking-[1px] !text-xs siemreap-regular ">
                  {userNameError}
                </p>
              </div>
              <div
                className={`fgrid justify-center ${
                  userNameError == "" ? "mt-3" : "mt-0"
                }`}
              >
                <input
                  className={`input-box line-hover font-human  ${
                    passwordError == "" ? "" : "!border-red-500"
                  }`}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="ពាក្យសម្ងាត់"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatorEnglish(e, setPassword);
                  }}
                />
                <p className=" text-red-500 text-center tracking-[1px] !text-xs siemreap-regular">
                  {passwordError}
                </p>
              </div>
              <div
                className={`flex justify-center min-w-[70px] ${
                  userNameError == "" ? "mt-2" : "mt-0"
                } `}
              >
                <Button
                  onClick={(e) => {
                    handleClickSubmit(
                      e,
                      userName,
                      password,
                      setUserNameError,
                      setPasswordError,
                      setUnauthorizedError
                    );
                  }}
                  color="blue"
                  text="ចូលប្រព័ន្ធ"
                  className="px-7 py-2 font-bold text-lg"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
