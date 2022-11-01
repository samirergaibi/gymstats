import styled from 'styled-components';
import { Paths } from '@constants';
import { Routes } from '@types';
import {
  WeightIcon,
  WeightLifterIcon,
  LogoutIcon,
  HomeIcon,
  InfoIcon,
  LoginIcon,
} from '@icons';
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
  { href: Paths.ROOT, text: 'Hem', icon: <HomeIcon color='white' size={24} /> },
  {
    href: Paths.ABOUT,
    text: 'Om Gymstats',
    icon: <InfoIcon color='white' size={24} />,
  },
  {
    href: Paths.LOGIN,
    text: 'Logga in',
    icon: <LoginIcon color='white' size={24} />,
  },
];

const loggedInRoutes = [
  {
    href: Paths.NEW_WORKOUT,
    text: 'Nytt träningspass',
    icon: <WeightLifterIcon color='white' size={24} />,
  },
  {
    href: Paths.WORKOUTS,
    text: 'Dina träningspass',
    icon: <WeightIcon color='white' size={24} />,
  },
  // Remove until future version where exercises is separate from workouts
  // { href: Paths.EXERCISES, text: 'Dina övningar' },
  {
    action: logout,
    href: '#',
    text: 'Logga ut',
    icon: <LogoutIcon color='white' size={24} />,
  },
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
