import React, { useState, useMemo } from "react";
import styled from "styled-components";
import InputContainer from "./InputContainer";

export interface LoginInfo {
  id: string;
  password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    id: "",
    password: "",
  });

  const isInputValid: boolean = useMemo(
    () =>
      loginInfo.id.includes("@") &&
      loginInfo.id.includes(".") &&
      loginInfo.password.length > 8,
    [loginInfo.id, loginInfo.password]
  );

  return (
    <LoginPage>
      <LoginContainer>
        <InputSection>
          <InputContainer setLoginInfo={setLoginInfo} type="id">
            아이디
          </InputContainer>
          <InputContainer setLoginInfo={setLoginInfo} type="password">
            패스워드
          </InputContainer>
        </InputSection>
        <ButtonSection>
          <SubmitButton disabled={!isInputValid}>로그인</SubmitButton>
          <SignupButton disabled={false}>회원가입</SignupButton>
        </ButtonSection>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;

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
  width: 500px;
  height: 500px;
  background-color: greenyellow;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 6;
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
    disabled ? "rgb(157, 157, 157)" : "rgb(90, 210, 255)"};
  font-size: 24px;
  color: white;
`;

const SignupButton = styled(SubmitButton)``;
