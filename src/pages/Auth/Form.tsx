import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputContainer from "./InputContainer";

export interface LoginInfo {
  id: string;
  password: string;
}

const Form = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<LoginInfo>({
    id: "",
    password: "",
  });

  const isInputValid: boolean = useMemo(
    () =>
      userInfo.id.includes("@") &&
      userInfo.id.includes(".") &&
      userInfo.password.length >= 8,
    [userInfo.id, userInfo.password]
  );

  const url: string = useMemo(
    () =>
      isLogin
        ? "http://localhost:8080/users/login"
        : "http://localhost:8080/users/create",
    [isLogin]
  );

  async function onSubmit() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.id,
          password: userInfo.password,
        }),
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        alert(result.message);
        navigate("/");
      } else {
        const result = await response.json();
        alert(result.details);
      }
    } catch (error) {
      alert("통신오류입니다");
    }
  }

  function changeForm() {
    setIsLogin(!isLogin);
  }

  return (
    <LoginPage>
      <LoginContainer>
        <Title>{isLogin ? "로그인" : "회원가입"}</Title>
        <InputSection>
          <InputContainer setUserInfo={setUserInfo} type="id">
            아이디
          </InputContainer>
          <InputContainer setUserInfo={setUserInfo} type="password">
            패스워드
          </InputContainer>
        </InputSection>
        {isLogin ? (
          <ButtonSection>
            <SubmitButton disabled={!isInputValid} onClick={onSubmit}>
              로그인
            </SubmitButton>
            <SignupButton disabled={false} onClick={changeForm}>
              회원가입
            </SignupButton>
          </ButtonSection>
        ) : (
          <ButtonSection>
            <SignupButton disabled={!isInputValid} onClick={onSubmit}>
              회원가입
            </SignupButton>
            <GoLoginButton disabled={false} onClick={changeForm}>
              로그인으로 돌아가기
            </GoLoginButton>
          </ButtonSection>
        )}
      </LoginContainer>
    </LoginPage>
  );
};

export default Form;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: greenyellow;
`;

const Title = styled.p`
  flex: 1;
  font-size: 30px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 5;
  width: 100%;
  height: 100%;
`;

const ButtonSection = styled(InputSection)`
  flex: 4;
  justify-content: space-evenly;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 80%;
  height: 50px;
  border: 0;
  border-radius: 10px;
  outline: 0;
  background-color: ${({ disabled }) =>
    disabled ? "rgb(157, 157, 157)" : "rgb(33, 150, 243)"};
  font-size: 24px;
  color: white;
`;

const SignupButton = styled(SubmitButton)``;

const GoLoginButton = styled(SubmitButton)``;
