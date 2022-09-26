import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { ArrowRightIcon } from '@icons';

const StyledLink = styled.a<{ withIcon?: boolean }>`
  font-weight: var(--medium-bold);
  color: var(--link);
  text-decoration: underline;
  display: ${({ withIcon }) => withIcon && 'flex'};
  align-items: ${({ withIcon }) => withIcon && 'center'};
  cursor: pointer;
`;

type Props = LinkProps & {
  children: React.ReactNode;
  spaceAfter?: boolean;
  spaceBefore?: boolean;
  withIcon?: boolean;
};

const Link: React.FC<Props> = ({
  children,
  spaceAfter,
  spaceBefore,
  withIcon,
  ...props
}) => {
  return (
    <>
      {spaceBefore && <span> </span>}
      <NextLink {...props}>
        <StyledLink withIcon={withIcon}>
          {children}
          {withIcon && <ArrowRightIcon />}
        </StyledLink>
      </NextLink>
      {spaceAfter && <span> </span>}
    </>
  );
};

export default Link;
