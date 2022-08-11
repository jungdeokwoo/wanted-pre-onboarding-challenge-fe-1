import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchapi } from "../../components/utility/fetchapi";
import { requestHeaders } from "../../components/utility/requestHeaders";
import { config } from "../../config";

const CreateTodo = () => {
  const [inputData, setInputData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  function titleInputHandler({ target }: ChangeEvent<HTMLInputElement>) {
    setInputData((prev) => ({ ...prev, title: target.value }));
  }

  function contentInputHandler({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setInputData((prev) => ({ ...prev, content: target.value }));
  }

  async function submitTodo() {
    try {
      const response = await fetchapi.post(
        `${config.Todo}`,
        inputData,
        requestHeaders
      );
      if (response.ok) {
        navigate("/");
      } else {
        alert("통신에러 다시시도해주세요");
      }
    } catch (e) {
      alert("다시 시도해주세요");
    }
  }

  return (
    <CreatePage>
      <TitleInput
        onChange={(event) => titleInputHandler(event)}
        placeholder="제목"
      />
      <ContentInput
        onChange={(event) => contentInputHandler(event)}
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
