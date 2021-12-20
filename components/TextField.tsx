import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
`;

const StyledTextField = styled.input`
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 8px 10px;
  font-size: 1rem;
  width: 100%;
`;

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const TextField: React.FC<Props> = props => {
  const { id, label } = props;

  return (
    <>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledTextField {...props} />
    </>
  );
};

export default TextField;
