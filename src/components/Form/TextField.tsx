import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import FormError from './FormError';

const StyledLabel = styled.label`
  font-weight: var(--medium-bold);
  font-size: 0.85rem;
`;

const StyledInputWrapper = styled.div`
  display: grid;
  gap: 5px;
  width: 100%;
`;

const StyledTextField = styled.input<{
  error?: string;
  touched?: boolean;
  borderStyle?: string;
}>`
  border-radius: 6px;
  border: ${({ error, touched, borderStyle }) =>
    error && touched ? '2px solid var(--error)' : borderStyle};
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
  withBorder?: boolean;
};

const TextField: React.FC<Props> = (props) => {
  const { withBorder, id, label, error, touched } = props;

  const borderStyle = withBorder ? '2px solid var(--dark)' : 'none';

  return (
    <StyledInputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledTextField {...props} borderStyle={borderStyle} />
      {error && touched && <FormError>{error}</FormError>}
    </StyledInputWrapper>
  );
};

export default TextField;
