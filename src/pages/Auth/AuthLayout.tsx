import React, { useState } from "react";
import Form from "./Form";

const LoginLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Form isLogin={isLogin} setIsLogin={setIsLogin}></Form>
      ) : (
        <Form isLogin={isLogin} setIsLogin={setIsLogin}></Form>
      )}
    </>
  );
};

export default LoginLayout;
