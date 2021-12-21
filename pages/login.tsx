import type { NextPage } from "next";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const StyledH1 = styled.h1`
  text-align: center;
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
      <StyledH1>Välkommen tillbaka till GymStats!</StyledH1>
      <Separator />
      <LoginForm />
      <p style={{ marginTop: 10 }}>
        Ny här? <a href="#">Skapa konto</a>
      </p>
    </StyledWrapper>
  );
};

export default Home;
