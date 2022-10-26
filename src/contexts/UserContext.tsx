import { createContext, useContext, useState } from 'react';
import { AuthUser, Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';

interface IUserContext {
  isFetched: boolean;
  session?: Session;
  user?: AuthUser;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [authEvent, setAuthEvent] = useState<string>();
  const something = useQuery(['get-session', authEvent], async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
      setAuthEvent(event);
    }
  });

  const { data, isFetched } = something;

  const value: IUserContext = {
    user: data?.session?.user,
    session: data?.session ?? undefined,
    isFetched,
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
