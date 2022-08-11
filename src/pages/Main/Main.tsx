import React, { useEffect, useState, ReactElement } from "react";
import {
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import TodoList from "./TodoList";
import { fetchapi } from "../../components/utility/fetchapi";
import { config } from "../../config";
import { requestHeaders } from "../../components/utility/requestHeaders";

export interface TodoListProp {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface MainFunction {
  (): ReactElement;
}

const Main: MainFunction = () => {
  const [todoList, setTodoList] = useState<TodoListProp[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async function () {
        try {
          const response = await fetchapi.get(`${config.Todo}`, requestHeaders);
          if (response.ok) {
            const result = await response.json();
            setTodoList(result.data);
          } else {
            alert("다시 접속해 주세요");
          }
        } catch (error) {
          alert("통신에러입니다 다시 시도해주세요");
        }
      })();
    }
  }, [location.pathname.split("/")[1]]);

  function goCreate() {
    navigate("/create");
  }

  return localStorage.getItem("token") ? (
    <TodoMain>
      <TodoMenu>
        <TodoTitle to={"/"}>TodoList</TodoTitle>
        <TodoButtonWrapper>
          <CreateButton onClick={goCreate}>생성하기</CreateButton>
        </TodoButtonWrapper>
      </TodoMenu>
      <TodoListWrapper>
        <TodoLists>
          {todoList.length !== 0 &&
            todoList.map((listItem) => {
              return (
                <TodoList listItem={listItem} key={listItem.id}></TodoList>
              );
            })}
        </TodoLists>
        <TodoDetail>
          <Outlet />
        </TodoDetail>
      </TodoListWrapper>
    </TodoMain>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default Main;

const TodoMain = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
`;

const TodoMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TodoTitle = styled(Link)`
  font-size: 24px;
  line-height: 50px;
`;

const TodoButtonWrapper = styled.div`
  height: 100%;
`;

const CreateButton = styled.button`
  width: 150px;
  height: 50px;
`;

const TodoListWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TodoLists = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const TodoDetail = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`;
