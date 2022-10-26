import styled from 'styled-components';
import Link from 'next/link';
import { Routes } from '@types';
import { Button } from '@styles';

const StyledNav = styled.nav`
  padding: 10px;
  background: var(--dark);
`;

const styledItem = `
  display: inline-block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
`;

const StyledLink = styled.a`
  ${styledItem}
`;

const StyledButton = styled(Button)`
  ${styledItem}
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
            {action ? (
              <StyledButton variant='unstyled' onClick={() => action()}>
                {text}
              </StyledButton>
            ) : (
              <Link href={href} passHref>
                <StyledLink>{text}</StyledLink>
              </Link>
            )}
          </li>
        ))}
      </StyledList>
    </StyledNav>
  );
};

export default DesktopNav;
