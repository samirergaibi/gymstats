import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  font-weight: var(--medium-bold);
  color: var(--link);
  text-decoration: underline;
`;

type Props = LinkProps & {
  children: React.ReactNode;
  spaceAfter?: boolean;
  spaceBefore?: boolean;
};

const Link: React.FC<Props> = ({
  children,
  spaceAfter,
  spaceBefore,
  ...props
}) => {
  return (
    <>
      {spaceBefore && <span> </span>}
      <NextLink {...props}>
        <StyledLink>{children}</StyledLink>
      </NextLink>
      {spaceAfter && <span> </span>}
    </>
  );
};

export default Link;
