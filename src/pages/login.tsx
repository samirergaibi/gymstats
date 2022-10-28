import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import LoginForm from '@components/LoginForm';
import { Paths } from '@constants';
import RouteHandler from '@components/RouteHandler';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1.8rem;
`;

const Separator = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 60%;
  margin: 40px;
`;

const StyledP = styled.p`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: var(--blue);
  text-decoration: underline;
`;

const Login: NextPage = () => {
  return (
    <RouteHandler isProtected={false}>
      <StyledWrapper>
        <StyledH1>Välkommen tillbaka till GymStats!</StyledH1>
        <Separator />
        <LoginForm />
        <StyledP>
          Ny här? <StyledLink href={Paths.REGISTER}>Skapa konto</StyledLink>
        </StyledP>
      </StyledWrapper>
    </RouteHandler>
  );
};

export default Login;
