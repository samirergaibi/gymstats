import type { NextPage } from "next";
import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <StyledWrapper>
      <h1>GymStats 💪</h1>
      <h2>Login</h2>
      <LoginForm />

      <hr />

      <h2>Sign up</h2>
      <SignupForm />
    </StyledWrapper>
  );
};

export default Home;
