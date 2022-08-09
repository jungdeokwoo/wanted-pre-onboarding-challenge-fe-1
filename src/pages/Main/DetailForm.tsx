import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TodoListProp } from "./Main";

interface DetailFormFunction {
  (param: {
    isModify: boolean;
    setIsModify: Dispatch<SetStateAction<boolean>>;
    detailInfo: TodoListProp;
  }): ReactElement;
}

const DetailForm: DetailFormFunction = ({
  setIsModify,
  isModify,
  detailInfo,
}) => {
  const navigate = useNavigate();

  async function deleteTodo(id: string | undefined) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", localStorage.getItem("token") || "");

    const response = await fetch(
      `http://localhost:8080/todos/${detailInfo.id}`,
      {
        method: "DELETE",
        headers: requestHeaders,
      }
    );
    if (response.ok) {
      navigate("/");
    } else {
      alert("게시물 삭제를 실패하였습니다.");
    }
  }

  function changeTodo() {
    setIsModify(!isModify);
  }

  return (
    <DetailWrapper>
      <DetailTitle>Title : {detailInfo.title}</DetailTitle>
      <DetailContent>Content : {detailInfo.content}</DetailContent>
      <ButtonWrapper>
        <ModifyButton onClick={() => changeTodo()}>수정하기</ModifyButton>
        <DeleteButton onClick={() => deleteTodo(detailInfo.id)}>
          삭제하기
        </DeleteButton>
      </ButtonWrapper>
    </DetailWrapper>
  );
};

export default DetailForm;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DetailTitle = styled.p`
  width: 100%;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
`;

const DetailContent = styled(DetailTitle)`
  font-size: 20px;
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

const DeleteButton = styled(ModifyButton)``;
