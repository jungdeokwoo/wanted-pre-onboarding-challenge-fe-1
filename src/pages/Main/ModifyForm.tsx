import React, {
  Dispatch,
  SetStateAction,
  ReactElement,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TodoListProp } from "./Main";

interface ModifyFormFunction {
  (param: {
    isModify: boolean;
    setIsModify: Dispatch<SetStateAction<boolean>>;
    detailInfo: TodoListProp;
    setDetailInfo: Dispatch<SetStateAction<TodoListProp>>;
  }): ReactElement;
}

const ModifyForm: ModifyFormFunction = ({
  isModify,
  setIsModify,
  setDetailInfo,
  detailInfo,
}) => {
  const navigate = useNavigate();

  async function modifyTodo() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", localStorage.getItem("token") || "");

    const response = await fetch(
      `http://localhost:8080/todos/${detailInfo.id}`,
      {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify({
          title: detailInfo.title,
          content: detailInfo.content,
        }),
      }
    );
    if (response.ok) {
      setIsModify(!isModify);
    } else {
      alert("다시 시도해주세요");
    }
  }

  function goBack() {
    navigate("/");
  }

  function titleHandler({ target }: ChangeEvent<HTMLInputElement>) {
    setDetailInfo((prev) => ({ ...prev, title: target.value }));
  }

  function contentHandler({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setDetailInfo((prev) => ({ ...prev, content: target.value }));
  }

  return (
    <ModifyWrapper>
      <ModifyTitle onChange={titleHandler} value={detailInfo.title} />
      <ModifyContent onChange={contentHandler} value={detailInfo.content} />
      <ButtonWrapper>
        <ModifyButton onClick={() => modifyTodo()}>수정하기</ModifyButton>
        <GoBackButton onClick={() => goBack()}>뒤로가기</GoBackButton>
      </ButtonWrapper>
    </ModifyWrapper>
  );
};

export default ModifyForm;

const ModifyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModifyTitle = styled.input`
  width: 100%;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
`;

const ModifyContent = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 30px;
  line-height: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`;

const ModifyButton = styled.button`
  flex: 1;
  width: 100%;
  height: 50px;
`;

const GoBackButton = styled(ModifyButton)``;
