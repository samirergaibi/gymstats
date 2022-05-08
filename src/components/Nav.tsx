import styled from 'styled-components';
import Link from 'next/link';
import { supabase } from '@utils/supabaseClient';
import { useUserContext } from '@contexts/UserContext';

type Routes = {
  action?: Function;
  href: string;
  text: string;
};

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

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(JSON.stringify(error));
  }
}

const loggedOutRoutes = [
  { href: '/', text: 'Hem' },
  { href: '/about', text: 'Om Gymstats' },
  { href: '/login', text: 'Logga in' },
];

const loggedInRoutes = [
  { href: '/account', text: 'Konto' },
  { href: '/exercises', text: 'Övningar' },
  { action: logout, href: '/login', text: 'Logga ut' },
];

const Nav: React.FC = () => {
  const { authenticated } = useUserContext();
  const routes: Routes[] = authenticated ? loggedInRoutes : loggedOutRoutes;

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

export default Nav;
