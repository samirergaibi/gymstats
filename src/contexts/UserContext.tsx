import { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

interface IUserContext {
  authenticated: boolean;
  isClient: boolean;
  user: AuthUser | null;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const user = supabase.auth.user();
  const isLoggedIn = !!user;

  useEffect(() => {
    setIsClient(true);
    if (!!isLoggedIn) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [isLoggedIn]);

  const value: IUserContext = {
    authenticated,
    isClient,
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
