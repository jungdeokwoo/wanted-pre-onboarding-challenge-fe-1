import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./pages/Auth/AuthLayout";
import Main from "./pages/Main/Main";
import CreateTodo from "./pages/Main/CreateTodo";
import Blank from "./pages/Main/Blank";
import TodoLayout from "./pages/Main/TodoLayout";
import ModifyForm from "./pages/Main/ModifyForm";
import DetailForm from "./pages/Main/DetailForm";

const Router = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<AuthLayout />} />
          <Route element={<Main />}>
            <Route path="/" element={<Blank />} />
            <Route element={<TodoLayout />}>
              <Route path="/detail/:id" element={<DetailForm />} />
              <Route path="/modify/:id" element={<ModifyForm />} />
            </Route>
            <Route path="/create" element={<CreateTodo />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Router;
