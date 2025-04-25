import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screen/login/Login.jsx";
import Master from "./master/Master.jsx";

const App = () => {
  return (
    <>
      {/* <BrowserRouter basename="/myapp"> */}
      <BrowserRouter>
        <Routes>
          {/* Login routes */}
          <Route path="/" element={<Navigate to="/log-in" replace />} />
          <Route path="/log-in" Component={Login}></Route>
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
          <Route path="/admin/word-edit" Component={Master}></Route>
          <Route path="/admin/word-detail/:id" Component={Master}></Route>
          {/* Password routes */}
          <Route path="/change-password" Component={Master}></Route>
          {/* Normal user */}
          {/* Word route */}
          <Route path="/word-list" Component={Master}></Route>
          <Route path="/word-create" Component={Master}></Route>
          <Route path="/word-edit" Component={Master}></Route>
          <Route path="/word-detail" Component={Master}></Route>
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
