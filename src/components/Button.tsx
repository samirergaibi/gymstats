import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  border: none;
  background: var(--peach);
  padding: 8px 16px;
  font-weight: var(--medium-bold);
  border-radius: var(--border-medium);
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
