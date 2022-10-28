import NextLink from 'next/link';
import styled from 'styled-components';
import { ArrowRightIcon } from '@icons';

const StyledLink = styled(NextLink)<{ $withIcon?: boolean }>`
  font-weight: var(--medium-bold);
  color: var(--link);
  text-decoration: underline;
  display: ${({ $withIcon }) => $withIcon && 'flex'};
  align-items: ${({ $withIcon }) => $withIcon && 'center'};
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
  spaceAfter?: boolean;
  spaceBefore?: boolean;
  withIcon?: boolean;
  href: string;
};

const Link: React.FC<Props> = ({
  children,
  spaceAfter,
  spaceBefore,
  withIcon,
  href,
}) => {
  return (
    <>
      {spaceBefore && <span> </span>}
      <StyledLink $withIcon={withIcon} href={href}>
        {children}
        {withIcon && <ArrowRightIcon />}
      </StyledLink>
      {spaceAfter && <span> </span>}
    </>
  );
};

export default Link;
