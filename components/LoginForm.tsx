import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";
import { Form, TextField } from "./Form";

const LoginForm = () => {
  const router = useRouter();

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
    <Form buttonText="Logga in" title="Logga in på ditt konto" onSubmit={login}>
      <TextField
        id="email"
        label="E-postadress"
        type="text"
        placeholder="Ange din e-postadress"
        value={loginFormData?.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setLoginFormData({
            ...loginFormData,
            email: event.target.value,
          });
        }}
      />
      <TextField
        id="password"
        label="Lösenord"
        type="password"
        placeholder="Ange ditt lösenord"
        value={loginFormData?.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setLoginFormData({
            ...loginFormData,
            password: event.target.value,
          });
        }}
      />
    </Form>
  );
};

export default LoginForm;
