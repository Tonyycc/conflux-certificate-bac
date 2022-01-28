import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
`;

const Label = styled.label`
  color: white;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
`;

const InputStyled = styled.input`
  outline: none;
  display: block;
  background: white;
  width: 100%;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: black;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  line-height: inherit;
  transition: 0.3s ease;
`;

const Input = (props) => {
  const { label, type = "text", value, onChange = () => null, name } = props;
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputStyled type={type} value={value} onChange={onChange} name={name} />
    </InputWrapper>
  );
};

export default Input;
