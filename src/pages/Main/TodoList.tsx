import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TodoListProp } from "./Main";

const TodoList = ({ listItem: { title, id } }: { listItem: TodoListProp }) => {
  const navigate = useNavigate();

  function goDetail(id: string) {
    navigate(`/detail/${id}`);
  }

  return (
    <ListWrapper onClick={() => goDetail(id)}>
      <ListTitle>Title: {title}</ListTitle>
    </ListWrapper>
  );
};

export default TodoList;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  :hover {
    background-color: aliceblue;
    cursor: pointer;
  }
`;

const ListTitle = styled.p`
  height: 50px;
  font-size: 24px;
  line-height: 50px;
  flex: 1;
`;

const ListContent = styled(ListTitle)``;
