import { useState, ChangeEvent, FormEvent } from "react";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";

const SignupForm = () => {
  const [signUpFormData, setSignUpFormData] = useState<AuthenticationData>();

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

  return (
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
  );
};

export default SignupForm;
