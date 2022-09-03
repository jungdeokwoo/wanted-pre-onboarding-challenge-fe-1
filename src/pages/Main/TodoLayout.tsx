import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { requestHeaders } from "../../components/utility/requestHeaders";
import { fetchapi } from "../../components/utility/fetchapi";
import { config } from "../../config";

const TodoLayout = () => {
  const [detailInfo, setDetailInfo] = useState({ content: "", title: "" });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const response = await fetchapi.get(
        `${config.Todo}/${params.id}`,
        requestHeaders
      );
      if (response.ok) {
        const result = await response.json();
        setDetailInfo(result.data);
      } else {
        const result = await response.json();
        alert(result.details);
        navigate(-1);
      }
    })();
  }, [params]);

  return (
    <>
      <Outlet context={{ detailInfo, setDetailInfo }}></Outlet>
    </>
  );
};

export default TodoLayout;
