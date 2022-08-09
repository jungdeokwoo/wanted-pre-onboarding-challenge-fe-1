import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TodoListProp } from "./Main";
import DetailForm from "./DetailForm";
import ModifyForm from "./ModifyForm";

const TodoLayout = () => {
  const [detailInfo, setDetailInfo] = useState<TodoListProp>(
    {} as TodoListProp
  );
  const [isModify, setIsModify] = useState(false);
  const params = useParams();

  useEffect(() => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", localStorage.getItem("token") || "");

    fetch(`http://localhost:8080/todos/${params.id}`, {
      headers: requestHeaders,
    })
      .then((res) => (res.ok ? res.json() : alert("통신오류")))
      .then((res) => setDetailInfo(res.data));
  }, [params]);

  return (
    <>
      {isModify ? (
        <ModifyForm
          setIsModify={setIsModify}
          setDetailInfo={setDetailInfo}
          isModify={isModify}
          detailInfo={detailInfo}
        />
      ) : (
        <DetailForm
          setIsModify={setIsModify}
          isModify={isModify}
          detailInfo={detailInfo}
        />
      )}
    </>
  );
};

export default TodoLayout;
