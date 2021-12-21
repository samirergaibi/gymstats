import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AuthenticationData } from "../types";
import { supabase } from "../utils/supabaseClient";
import TextField from "../components/TextField";

const StyledWrapper = styled.div`
  box-shadow: var(--box-shadow-main);
  border-radius: 5px;
  margin-top: 15px;
  position: relative;
  background: var(--purple-gradient);
  color: white;
  width: 90%;
  @media screen and (min-width: 600px) {
    width: 500px;
  }
`;

const StyledForm = styled.form`
  padding: 50px 30px;
`;

const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: -15px;
`;

const StyledH2 = styled.span`
  background: var(--orange-gradient);
  padding: 10px;
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transform: rotate(-2deg);
`;

const StyledInputWrapper = styled.div<{ firstItem?: boolean }>`
  display: grid;
  gap: 5px;
  margin-bottom: 15px;
  margin-top: ${({ firstItem }) => firstItem && "0px"};
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
        <StyledH2>Logga in på ditt konto</StyledH2>
      </StyledHeadingWrapper>
      <StyledForm onSubmit={login}>
        <StyledInputWrapper firstItem>
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
          <button type="submit">Logga in</button>
        </StyledButtonWrapper>
      </StyledForm>
    </StyledWrapper>
  );
};

export default LoginForm;
