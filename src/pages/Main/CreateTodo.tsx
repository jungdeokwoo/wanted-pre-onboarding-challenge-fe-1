import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateTodo = () => {
  const [inputData, setInputData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  function titleHandler({ target }: ChangeEvent<HTMLInputElement>) {
    setInputData((prev) => ({ ...prev, title: target.value }));
  }

  function contentHandler({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setInputData((prev) => ({ ...prev, content: target.value }));
  }

  async function submitTodo() {
    try {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("Authorization", localStorage.getItem("token") || "");

      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(inputData),
      });
      if (response.ok) {
        navigate("/");
      } else {
        alert("통신에러 다시시도해주세요");
      }
    } catch (e) {
      alert("다시시도해주세요");
    }
  }

  return (
    <CreatePage>
      <TitleInput
        onChange={(event) => titleHandler(event)}
        placeholder="제목"
      />
      <ContentInput
        onChange={(event) => contentHandler(event)}
        placeholder="내용"
      />
      <SubmitButton onClick={submitTodo}>생성하기</SubmitButton>
    </CreatePage>
  );
};

export default CreateTodo;

const CreatePage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 100px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
`;
