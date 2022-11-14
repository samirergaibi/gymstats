import { HTMLInputTypeAttribute, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';

const Error = styled.p`
  color: var(--error);
  font-weight: var(--medium-bold);
  font-size: 0.8rem;
  text-align: center;
`;

const Label = styled.label`
  font-weight: var(--medium-bold);
  font-size: 0.85rem;
`;

const InputWrapper = styled.div`
  display: grid;
  gap: 5px;
  width: 100%;
`;

const Input = styled.input<{
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

type Props = {
  autoComplete?: string;
  error?: string;
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  withBorder?: boolean;
  onChange?: (e: SyntheticEvent) => void;
};

const FormInput: React.FC<Props> = ({
  autoComplete,
  error,
  id,
  label,
  register,
  type,
  placeholder,
  withBorder,
  onChange,
}) => {
  const borderStyle = withBorder ? '2px solid var(--dark)' : 'none';

  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        autoComplete={autoComplete}
        borderStyle={borderStyle}
        placeholder={placeholder}
        type={type}
        {...register(id, {
          onChange: (e) => {
            if (onChange) {
              onChange(e);
            }
          },
        })}
      />
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

export default FormInput;
