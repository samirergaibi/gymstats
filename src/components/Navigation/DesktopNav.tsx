import styled from 'styled-components';
import Link from 'next/link';
import { Routes } from '@types';

const StyledNav = styled.nav`
  padding: 10px;
  background: var(--dark);
`;

const StyledLink = styled.a`
  display: inline-block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;

type Props = {
  routes: Routes[];
};

const DesktopNav: React.FC<Props> = ({ routes }) => {
  return (
    <StyledNav>
      <StyledList>
        {routes.map(({ action, href, text }) => (
          <li key={href}>
            <Link href={href} passHref>
              {action ? (
                <StyledLink onClick={() => action()}>{text}</StyledLink>
              ) : (
                <StyledLink>{text}</StyledLink>
              )}
            </Link>
          </li>
        ))}
      </StyledList>
    </StyledNav>
  );
};

export default DesktopNav;
