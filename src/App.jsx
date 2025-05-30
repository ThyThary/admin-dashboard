import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screen/login/Login.jsx";
import Master from "./master/Master.jsx";
import WEB_BASE_URL from "./config/web.js";
const App = () => {
  // Missing token
  // useEffect(() => {
  //   const token = localStorage.getItem("access");
  //   if (!token) {
  //     alert("ផុតកំណត់ការប្រើប្រាស់!");
  //     window.location.href = `${WEB_BASE_URL}/log-in`;
  //   }
  // }, []);

  return (
    <>
      {/* <BrowserRouter basename="/myapp"> */}
      <BrowserRouter>
        <Routes>
          {/* Login routes */}
          <Route path="/" element={<Navigate to="/log-in" replace />} />
          <Route path="/log-in" Component={Login}></Route>
          {/* Home routes */}
          <Route path="/admin/home" Component={Master}></Route>
          {/* User routes */}
          <Route path="/admin/user-list" Component={Master}></Route>
          <Route path="/admin/user-create" Component={Master}></Route>
          <Route path="/admin/user-edit/:id" Component={Master}></Route>
          <Route path="/admin/user-detail/:id" Component={Master}></Route>
          {/* Controller routes */}
          <Route path="/admin/controller-list" Component={Master}></Route>
          <Route path="/admin/controller-detail/:id" Component={Master}></Route>
          {/* Word routes */}
          <Route path="/admin/word-list" Component={Master}></Route>
          <Route path="/admin/word-create" Component={Master}></Route>
          <Route path="/admin/word-edit/:id" Component={Master}></Route>
          <Route path="/admin/word-detail/:id" Component={Master}></Route>
          {/* Dictionary routes */}
          <Route path="/admin/dictionary-list" Component={Master}></Route>
          <Route path="/admin/dictionary-detail/:id" Component={Master}></Route>
          <Route path="/admin/dictionary-edit/:id" Component={Master}></Route>
          {/* Comment routes */}
          <Route path="/admin/comment-list" Component={Master}></Route>
          <Route path="/user/word-list" Component={Master}></Route>
          <Route path="/user/word-create" Component={Master}></Route>
          <Route path="/user/word-edit/:id" Component={Master}></Route>
          <Route path="/user/word-detail/:id" Component={Master}></Route>
          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={<h2 className=" text-center">404 - Page Not Found</h2>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
