import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import config from "../config";

const SupabaseContext = createContext({} as ISupabaseContext);

interface ISupabaseContext {
  supabase?: SupabaseClient;
}

const SupaBaseContext: React.FC = ({ children }) => {
  const [supabase, setSupabase] = useState<SupabaseClient>();

  useEffect(() => {
    const supabaseClient = createClient(
      config.SUPABASE_URL,
      config.SUPABASE_KEY
    );

    setSupabase(supabaseClient);
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupaBaseContext = () =>
  useContext(SupabaseContext) as ISupabaseContext;

export default SupaBaseContext;
