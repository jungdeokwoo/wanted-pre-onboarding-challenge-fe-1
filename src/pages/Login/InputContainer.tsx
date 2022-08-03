import React, { Dispatch, ReactElement, SetStateAction } from "react";
import styled from "styled-components";
import { LoginInfo } from "./Login";

interface InputContainerProps {
  children: string;
  type: string;
  setLoginInfo: Dispatch<SetStateAction<LoginInfo>>;
}

interface InputContainerFunction {
  (param: InputContainerProps): ReactElement;
}

const InputContainer: InputContainerFunction = ({
  children,
  type,
  setLoginInfo,
}) => {
  function inputHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void {
    const value = event.target.value;
    setLoginInfo((prevInput) => ({ ...prevInput, [type]: value }));
  }

  return (
    <Container>
      <InputTitle>{children}</InputTitle>
      <InputSection
        type={type === "password" ? "password" : "text"}
        onChange={(event) => inputHandler(event, type)}
      />
    </Container>
  );
};

export default InputContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 30px;
`;

const InputTitle = styled.p`
  margin-bottom: 10px;
`;

const InputSection = styled.input`
  width: 80%;
  height: 40px;
  margin: 0 auto;
  border: 1px solid greenyellow;
  border-radius: 5px;
  font-size: 24px;
  outline: none;
`;
