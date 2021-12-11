import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { AuthenticationData } from "../types";
import { useSupaBaseContext } from "../contexts/SupabaseContext";

const LoginForm = () => {
  const router = useRouter();
  const { supabase } = useSupaBaseContext();

  const [loginFormData, setLoginFormData] = useState<AuthenticationData>();

  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      throw new Error("Trying to log in without being connected to Supabase.");
    }

    const { user, session, error } = await supabase.auth.signIn({
      email: loginFormData?.email,
      password: loginFormData?.password,
    });
    if (error) {
      // TODO: Add error handling when form is more evolved
      alert(error.message);
    }
    if (session && user) {
      // TODO: route to correct login page when it exists
      router.push("/about");
    }
    console.log({
      user,
      session,
      error,
    });
  };

  return (
    <form onSubmit={login}>
      <div>
        <label>Email: </label>
        <input
          type="text"
          value={loginFormData?.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginFormData({
              ...loginFormData,
              email: event.target.value,
            });
          }}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={loginFormData?.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginFormData({
              ...loginFormData,
              password: event.target.value,
            });
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
