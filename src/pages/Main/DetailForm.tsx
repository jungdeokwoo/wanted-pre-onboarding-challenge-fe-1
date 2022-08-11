import React, { ReactElement } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchapi } from "../../components/utility/fetchapi";
import { requestHeaders } from "../../components/utility/requestHeaders";
import { config } from "../../config";
import { TodoListProp } from "./Main";

interface DetailFormFunction {
  (): ReactElement;
}

interface ContextParameter {
  detailInfo: TodoListProp;
}

const DetailForm: DetailFormFunction = () => {
  const navigate = useNavigate();
  const { detailInfo } = useOutletContext<ContextParameter>();

  async function deleteTodo(todoItemId: string | undefined) {
    const response = await fetchapi.delete(
      `${config.Todo}/${todoItemId}`,
      requestHeaders
    );
    if (response.ok) {
      navigate("/");
    } else {
      alert("게시물 삭제를 실패하였습니다.");
    }
  }

  function goModify(todoItemId: string | undefined) {
    navigate(`/modify/${todoItemId}`);
  }

  return (
    <DetailWrapper>
      <DetailTitle>Title : {detailInfo.title}</DetailTitle>
      <DetailContent>Content : {detailInfo.content}</DetailContent>
      <ButtonWrapper>
        <ModifyButton onClick={() => goModify(detailInfo.id)}>
          수정하기
        </ModifyButton>
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
