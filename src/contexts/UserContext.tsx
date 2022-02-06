import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';

interface IUserContext {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabaseUser = supabase.auth.user();
    setUser(supabaseUser);
  });

  const value: IUserContext = {
    isLoggedIn: user ? true : false,
    user,
    setUser,
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
