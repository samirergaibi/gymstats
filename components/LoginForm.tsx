import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";
import TextField from "../components/TextField";

const StyledForm = styled.form`
  display: block;
  box-shadow: var(--box-shadow-main);
  border-radius: 5px;
  padding: 50px 30px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInputWrapper = styled.div<{ firstItem?: boolean }>`
  display: grid;
  gap: 5px;
  margin: 15px;
  margin-top: ${({ firstItem }) => firstItem && "0px"};
`;

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
    <StyledForm onSubmit={login}>
      <StyledInputWrapper firstItem>
        <TextField
          id="email"
          label="Email"
          type="text"
          value={loginFormData?.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginFormData({
              ...loginFormData,
              email: event.target.value,
            });
          }}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={loginFormData?.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginFormData({
              ...loginFormData,
              password: event.target.value,
            });
          }}
        />
      </StyledInputWrapper>
      <StyledButtonWrapper>
        <button type="submit">Login</button>
      </StyledButtonWrapper>
    </StyledForm>
  );
};

export default LoginForm;
