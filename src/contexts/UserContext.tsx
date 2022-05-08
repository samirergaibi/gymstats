import { createContext, useContext, useState, useEffect } from 'react';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';

interface IUserContext {
  authenticated: boolean;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

const updateSupabaseCookie = async (
  event: AuthChangeEvent,
  session: Session | null,
) => {
  await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, session }),
  });
};

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });
      if (event === 'SIGNED_IN') {
        setAuthenticated(true);
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
      }
      updateSupabaseCookie(event, session);
    });

    () => {
      authListener.data?.unsubscribe();
    };
  }, []);

  const value: IUserContext = {
    authenticated,
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
