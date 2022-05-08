import { FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import FormError from './FormError';

const StyledWrapper = styled.div`
  box-shadow: var(--box-shadow-primary);
  border-radius: var(--border-medium);
  margin-top: 15px;
  position: relative;
  background: var(--dark);
  color: white;
  width: 90%;
  @media screen and (min-width: 600px) {
    width: 500px;
  }
`;

const StyledForm = styled.form`
  padding: 60px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: -15px;
`;

const StyledFormTitle = styled.span`
  background: var(--dark);
  box-shadow: var(--box-shadow-strong);
  padding: 10px;
  border-radius: var(--border-medium);
  font-weight: var(--medium-bold);
  transform: rotate(-2deg);
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  buttonText: string;
  children: React.ReactNode;
  error?: string;
  title?: string;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<Props> = ({
  buttonText,
  children,
  error,
  title,
  onSubmit,
}) => {
  return (
    <StyledWrapper>
      {title && (
        <StyledHeadingWrapper>
          <StyledFormTitle>{title}</StyledFormTitle>
        </StyledHeadingWrapper>
      )}
      <StyledForm onSubmit={onSubmit}>
        {children}{' '}
        <StyledButtonWrapper>
          <Button type="submit">{buttonText}</Button>
        </StyledButtonWrapper>
        {error && <FormError>{error}</FormError>}
      </StyledForm>
    </StyledWrapper>
  );
};

export default Form;
