import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@contexts/UserContext';
import { Paths } from '@constants';

export const useRedirectIfLoggedIn = () => {
  const router = useRouter();
  const { authenticated } = useUserContext();

  useEffect(() => {
    if (authenticated) {
      router.push(Paths.NEW_WORKOUT);
    }
  }, [authenticated]);
};
