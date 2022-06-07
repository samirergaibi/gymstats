import { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

interface IUserContext {
  authenticated: boolean;
  user: AuthUser | null;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const user = supabase.auth.user();

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });
      if (event === 'SIGNED_IN') {
        setAuthenticated(true);
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
      }
    });

    return () => {
      authListener.data?.unsubscribe();
    };
  }, []);

  // TODO: Without this nav doesnt work on logged in pages, find a better way
  const setInitialLoginStatus = async () => {
    const isLoggedIn = !!user;

    setAuthenticated(isLoggedIn);
    if (!isLoggedIn) {
      supabase.auth.signOut();
    }
  };

  useEffect(() => {
    setInitialLoginStatus();
  }, []);

  const value: IUserContext = {
    authenticated,
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export default UserContext;
