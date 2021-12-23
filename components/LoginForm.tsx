import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";
import TextField from "../components/TextField";
import Button from "./Button";

const StyledWrapper = styled.div`
  box-shadow: var(--box-shadow-primary);
  border-radius: var(--border-medium);
  margin-top: 15px;
  position: relative;
  background: var(--gradient-primary);
  color: white;
  width: 90%;
  @media screen and (min-width: 600px) {
    width: 500px;
  }
`;

const StyledForm = styled.form`
  padding: 60px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: -15px;
`;

const StyledFormTitle = styled.span`
  background: var(--orange-gradient);
  box-shadow: var(--box-shadow-primary);
  padding: 10px;
  border-radius: var(--border-medium);
  font-weight: var(--medium-bold);
  transform: rotate(-2deg);
`;

const StyledInputWrapper = styled.div`
  display: grid;
  gap: 5px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
    <StyledWrapper>
      <StyledHeadingWrapper>
        <StyledFormTitle>Logga in på ditt konto</StyledFormTitle>
      </StyledHeadingWrapper>
      <StyledForm onSubmit={login}>
        <StyledInputWrapper>
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
        </StyledInputWrapper>
        <StyledInputWrapper>
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
        </StyledInputWrapper>
        <StyledButtonWrapper>
          <Button type="submit">Logga in</Button>
        </StyledButtonWrapper>
      </StyledForm>
    </StyledWrapper>
  );
};

export default LoginForm;
