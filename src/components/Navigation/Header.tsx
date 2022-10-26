import styled from 'styled-components';
import { Paths } from '@constants';
import { Routes } from '@types';
import { supabase } from '@utils/supabaseClient';
import { useUserContext } from '@contexts/UserContext';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const StyledMobileHeader = styled(MobileHeader)`
  display: initial;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const StyledDesktopHeader = styled(DesktopHeader)`
  display: none;
  @media (min-width: 1000px) {
    display: initial;
  }
`;

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(JSON.stringify(error));
  }
}

const loggedOutRoutes = [
  { href: Paths.ROOT, text: 'Hem' },
  { href: Paths.ABOUT, text: 'Om Gymstats' },
  { href: Paths.LOGIN, text: 'Logga in' },
];

const loggedInRoutes = [
  { href: Paths.NEW_WORKOUT, text: 'Nytt träningspass' },
  { href: Paths.WORKOUTS, text: 'Dina träningspass' },
  // Remove until future version where exercises is separate from workouts
  // { href: Paths.EXERCISES, text: 'Dina övningar' },
  { action: logout, href: '#', text: 'Logga ut' },
];

const Header = () => {
  const { user } = useUserContext();
  const routes: Routes[] = !!user ? loggedInRoutes : loggedOutRoutes;
  // TODO: Change the DOM so that it doesn't render two headers
  return (
    <>
      <StyledMobileHeader routes={routes} />
      <StyledDesktopHeader routes={routes} />
    </>
  );
};

export default Header;
