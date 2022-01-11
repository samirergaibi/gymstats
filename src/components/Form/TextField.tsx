import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import FormError from './FormError';

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
`;

const StyledInputWrapper = styled.div`
  display: grid;
  gap: 5px;
`;

const StyledTextField = styled.input<{ error?: string; touched?: boolean }>`
  border-radius: 6px;
  border: ${({ error, touched }) =>
    error && touched ? '2px solid #f00800' : 'none'};
  padding: 8px 10px;
  font-size: 1rem;
  width: 100%;
  &::placeholder {
    font-size: 0.8rem;
  }
`;

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  touched?: boolean;
};

const TextField: React.FC<Props> = (props) => {
  const { id, label, error, touched } = props;

  return (
    <StyledInputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledTextField {...props} />
      {error && touched && <FormError>{error}</FormError>}
    </StyledInputWrapper>
  );
};

export default TextField;
