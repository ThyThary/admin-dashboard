import React, { useState } from "react";
import "./login.css";
import validatorEnglish from "../../validate/english";
import handleClickSubmit from "../../validate/email";
import Button from "../../style/tailwind/Button";
import imgFMISLogo from "../../assets/logo/FMIS_Dictionary.png";
//User log in account
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [unauthorizedError, setUnauthorizedError] = useState("");

  return (
    <>
      <div className="flex h-screen font-serif bg-slate-100 ">
        <div className="flex w-full justify-center items-center text-center">
          <div className=" w-[310px] h-[360px] bg-white rounded-xl shadow-xl">
            <div className="flex mt-5 justify-center">
              {/* Icons */}
              <img
                src={imgFMISLogo}
                width={65}
                height={65}
                alt=""
                className="shadow-md rounded-2xl"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="employeefrm" className="font-hanuman-title">
                ប្រព័ន្ធគ្រប់គ្រងវចនានុក្រម
              </label>
            </div>
            <form className="grid grid-cols-1 mt-2">
              <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman">
                {unauthorizedError}
              </p>
              <div className="grid justify-center">
                <input
                  className={`input-box line-hover font-hanuman
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
                <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman ">
                  {userNameError}
                </p>
              </div>
              <div
                className={`fgrid justify-center ${
                  userNameError == "" ? "mt-3" : "mt-0"
                }`}
              >
                <input
                  className={`input-box line-hover font-hanuman  ${
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
                <p className=" !text-red-500 text-center tracking-[1px] !text-xs font-hanuman">
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
                      setUnauthorizedError,
                      setIsLoading
                    );
                  }}
                  color="green"
                  text="ចូលប្រព័ន្ធ"
                  className="px-7 py-2 font-bold text-lg mt-1"
                  isLoading={isLoading}
                  disabled={isLoading}
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
