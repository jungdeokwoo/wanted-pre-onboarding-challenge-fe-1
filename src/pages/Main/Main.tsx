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
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", localStorage.getItem("token") || "");

    fetch("http://localhost:8080/todos", {
      headers: requestHeaders,
    })
      .then((res) => (res.ok ? res.json() : alert("통신에러")))
      .then((res) => setTodoList(res.data));
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
            todoList.map((item) => {
              return <TodoList data={item} key={item.id}></TodoList>;
            })}
        </TodoLists>
        <TodoDetail>
          <Outlet />
        </TodoDetail>
      </TodoListWrapper>
    </TodoMain>
  ) : (
    <Navigate to={"/login"} replace={true}></Navigate>
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
