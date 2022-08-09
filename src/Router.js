import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout";
import Main from "./pages/Main/Main";
import CreateTodo from "./pages/Main/CreateTodo";
import Blank from "./pages/Main/Blank";
import TodoLayout from "./pages/Main/TodoLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout />} />
        <Route element={<Main />}>
          <Route path="/" element={<Blank />} />
          <Route path="/detail/:id" element={<TodoLayout />} />
          <Route path="/create" element={<CreateTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
