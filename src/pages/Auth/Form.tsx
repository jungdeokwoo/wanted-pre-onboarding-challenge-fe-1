import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputContainer from "./InputContainer";
import { fetchapi } from "../../components/utility/fetchapi";
import { config } from "../../config";

export interface LoginInfo {
  email: string;
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
    email: "",
    password: "",
  });

  const isInputValid: boolean = useMemo(
    () =>
      userInfo.email.includes("@") &&
      userInfo.email.includes(".") &&
      userInfo.password.length >= 8,
    [userInfo.email, userInfo.password]
  );

  const url: string = useMemo(
    () => (isLogin ? `${config.Auth}/login` : `${config.Auth}/create`),
    [isLogin]
  );

  async function onSubmit() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", localStorage.getItem("token") || "");
    try {
      const response = await fetchapi.post<{ email: string; password: string }>(
        url,
        userInfo,
        requestHeaders
      );
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

  console.log(userInfo);

  return (
    <LoginPage>
      <LoginContainer>
        <Title>{isLogin ? "로그인" : "회원가입"}</Title>
        <InputSection>
          <InputContainer setUserInfo={setUserInfo} type="email">
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
