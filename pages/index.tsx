import type { NextPage } from "next";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
`;

const StyledH1 = styled.h1`
  text-align: center;
`;

const StyledH2 = styled.h2`
  margin-bottom: 10px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 60%;
  margin: 20px;
`;

const Home: NextPage = () => {
  return (
    <StyledWrapper>
      <StyledH1>Stats for your gym workouts 💪</StyledH1>
      <Separator />
      <StyledH2>Sign in to your account</StyledH2>
      <LoginForm />
    </StyledWrapper>
  );
};

export default Home;
