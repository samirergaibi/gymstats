import { InputHTMLAttributes } from "react";
import { NextPage } from "next";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
`;

const StyledTextField = styled.input`
  border-radius: 6px;
  border: none;
  padding: 8px 10px;
  font-size: 1rem;
  width: 100%;
  &::placeholder {
    font-size: 0.8rem;
  }
`;

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const TextField: NextPage<Props> = props => {
  const { id, label } = props;

  return (
    <>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledTextField {...props} />
    </>
  );
};

export default TextField;
