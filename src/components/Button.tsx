import styled from 'styled-components';

const StyledButton = styled.button<{ variant: string }>`
  color: white;
  border: none;
  background: ${({ variant }) => variant};
  padding: 8px 16px;
  font-weight: var(--medium-bold);
  border-radius: var(--border-medium);
  cursor: pointer;
`;

const UnstyledButton = styled.button`
  all: unset;
  cursor: pointer;
`;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'red' | 'blue' | 'unstyled';
};

const Button: React.FC<Props> = ({ children, variant = 'red', ...props }) => {
  if (variant === 'unstyled') {
    return <UnstyledButton {...props}>{children}</UnstyledButton>;
  }

  const backgroundColor = (() => {
    switch (variant) {
      case 'blue':
        return 'var(--blue)';
      default:
        return 'var(--peach)';
    }
  })();

  return (
    <StyledButton {...props} variant={backgroundColor}>
      {children}
    </StyledButton>
  );
};

export default Button;
