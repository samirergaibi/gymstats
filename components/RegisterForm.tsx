import { useState, ChangeEvent, FormEvent } from "react";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";
import { Form, TextField } from "./Form";

const RegisterForm = () => {
  const [registerFormData, setRegisterFormData] =
    useState<AuthenticationData>();

  const register = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      throw new Error("Trying to sign up without being connect to Supabase.");
    }

    const { user, session, error } = await supabase.auth.signUp(
      {
        email: registerFormData?.email,
        password: registerFormData?.password,
      },
      { redirectTo: "https://samirergaibi.se" }
    );
    console.log({
      user,
      session,
      error,
    });
  };

  return (
    <Form buttonText="Skapa konto" title="Skapa ett konto" onSubmit={register}>
      <TextField
        id="email"
        label="E-postadress"
        type="text"
        placeholder="Ange din e-postadress"
        value={registerFormData?.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setRegisterFormData({
            ...registerFormData,
            email: event.target.value,
          });
        }}
      />
      <TextField
        id="password"
        label="Lösenord"
        type="password"
        placeholder="Ange ditt lösenord"
        value={registerFormData?.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setRegisterFormData({
            ...registerFormData,
            password: event.target.value,
          });
        }}
      />
      <TextField
        id="password"
        label="Upprepa lösenord"
        type="password"
        placeholder="Ange ditt lösenord"
        value={registerFormData?.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          // TODO: Check that they enter the same password
        }}
      />
    </Form>
  );
};

export default RegisterForm;
