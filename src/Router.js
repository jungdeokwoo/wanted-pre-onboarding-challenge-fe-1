import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout";
import Main from "./pages/Main/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
