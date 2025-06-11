import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./screen/login/Login.jsx";
import Master from "./master/Master.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthSyncWrapper from "./components/AuthSyncWrapper.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthSyncWrapper>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/log-in" replace />} />

          {/* Login route */}
          <Route path="/log-in" element={<Login />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <Master />
              </ProtectedRoute>
            }
          />

          {/* Other admin routes */}
          <Route path="/admin/user-list" element={<Master />} />
          <Route path="/admin/user-create" element={<Master />} />
          <Route path="/admin/user-edit/:id" element={<Master />} />
          <Route path="/admin/user-detail/:id" element={<Master />} />

          <Route path="/admin/controller-list" element={<Master />} />
          <Route path="/admin/controller-detail/:id" element={<Master />} />

          <Route path="/admin/word-list" element={<Master />} />
          <Route path="/admin/word-create" element={<Master />} />
          <Route path="/admin/word-edit/:id" element={<Master />} />
          <Route path="/admin/word-detail/:id" element={<Master />} />

          <Route path="/admin/dictionary-list" element={<Master />} />
          <Route path="/admin/dictionary-detail/:id" element={<Master />} />
          <Route path="/admin/dictionary-edit/:id" element={<Master />} />

          <Route path="/admin/comment-list" element={<Master />} />

          {/* User routes */}
          <Route path="/user/word-list" element={<Master />} />
          <Route path="/user/word-create" element={<Master />} />
          <Route path="/user/word-edit/:id" element={<Master />} />
          <Route path="/user/word-detail/:id" element={<Master />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={<h2 className="text-center">404 - Page Not Found</h2>}
          />
        </Routes>
      </AuthSyncWrapper>
    </BrowserRouter>
  );
};

export default App;
