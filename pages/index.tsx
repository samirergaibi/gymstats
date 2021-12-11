import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import config from "../config";

type AuthenticationData = {
  email?: string;
  password?: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [supabase, setSupabase] = useState<SupabaseClient>();
  const [loginFormData, setLoginFormData] = useState<AuthenticationData>();
  const [signUpFormData, setSignUpFormData] = useState<AuthenticationData>();

  useEffect(() => {
    const supabaseClient = createClient(
      config.SUPABASE_URL,
      config.SUPABASE_KEY
    );
    setSupabase(supabaseClient);
  }, []);

  const signUp = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      throw new Error("Trying to sign up without being connect to Supabase.");
    }

    const { user, session, error } = await supabase.auth.signUp(
      {
        email: signUpFormData?.email,
        password: signUpFormData?.password,
      },
      { redirectTo: "https://samirergaibi.se" }
    );
    console.log({
      user,
      session,
      error,
    });
  };

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
    <div>
      <h1>Login</h1>
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

      <hr />

      <h1>Sign up</h1>
      <form onSubmit={signUp}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={signUpFormData?.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpFormData({
                ...signUpFormData,
                email: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={signUpFormData?.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpFormData({
                ...signUpFormData,
                password: event.target.value,
              });
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Home;
