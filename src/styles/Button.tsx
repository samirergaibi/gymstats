import styled from 'styled-components';

const StyledButton = styled.button<{ hasIcon: boolean; variant: string }>`
  color: white;
  border: none;
  background: ${({ variant }) => variant};
  padding: 8px 16px;
  font-weight: var(--medium-bold);
  border-radius: var(--border-medium);
  cursor: pointer;
  display: ${({ hasIcon }) => hasIcon && 'flex'};
  gap: ${({ hasIcon }) => hasIcon && '5px'};
  align-items: ${({ hasIcon }) => hasIcon && 'center'};
`;

const UnstyledButton = styled.button`
  all: unset;
  cursor: pointer;
`;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'red' | 'blue' | 'unstyled';
  icon?: React.ReactNode;
};

const Button: React.FC<Props> = ({
  children,
  variant = 'red',
  icon,
  ...props
}) => {
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
    <StyledButton {...props} variant={backgroundColor} hasIcon={!!icon}>
      {!!icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;
