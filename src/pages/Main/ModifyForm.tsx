import React, {
  Dispatch,
  SetStateAction,
  ReactElement,
  ChangeEvent,
} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchapi } from "../../components/utility/fetchapi";
import { requestHeaders } from "../../components/utility/requestHeaders";
import { config } from "../../config";
import { TodoListProp } from "./Main";

interface ModifyFormFunction {
  (): ReactElement;
}

interface ContextParameter {
  detailInfo: TodoListProp;
  setDetailInfo: Dispatch<SetStateAction<TodoListProp>>;
}

const ModifyForm: ModifyFormFunction = () => {
  const { detailInfo, setDetailInfo } = useOutletContext<ContextParameter>();
  const navigate = useNavigate();

  async function modifyTodo() {
    const response = await fetchapi.put<{ title: string; content: string }>(
      `${config.Todo}/${detailInfo.id}`,
      {
        title: detailInfo.title,
        content: detailInfo.content,
      },
      requestHeaders
    );
    if (response.ok) {
      navigate(`/detail/${detailInfo.id}`, { replace: true });
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
