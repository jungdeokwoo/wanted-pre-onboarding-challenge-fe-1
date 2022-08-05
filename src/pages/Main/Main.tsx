import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ?? navigate("/login");
  }, []);

  return <div>Main</div>;
};

export default Main;
