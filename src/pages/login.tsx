import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import LoginForm from '@components/LoginForm';
import Spinner from '@components/Spinner';
import { useUserContext } from '@contexts/UserContext';
import { redirectIfLoggedIn } from '@utils/redirectIfLoggedIn';

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

const StyledLink = styled.a`
  color: var(--blue);
  text-decoration: underline;
`;

export const getServerSideProps = redirectIfLoggedIn;

const Login: NextPage = () => {
  const { authenticated } = useUserContext();

  // Providing user feedback before redirecting when logging in
  if (authenticated) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <StyledH1>Välkommen tillbaka till GymStats!</StyledH1>
      <Separator />
      <LoginForm />
      <StyledP>
        Ny här?{' '}
        <Link href="/register" passHref>
          <StyledLink>Skapa konto</StyledLink>
        </Link>
      </StyledP>
    </StyledWrapper>
  );
};

export default Login;
