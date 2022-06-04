import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import LoginForm from '@components/LoginForm';
import Spinner from '@components/Spinner';
import { Paths } from '@constants';
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
  const router = useRouter();
  const { authenticated } = useUserContext();

  // Handle when supabase is logged in on the client but not server
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (authenticated) {
      interval = setInterval(() => {
        console.log('trying to redirect');
        router.push(Paths.EXERCISES);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [authenticated]);

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
        <Link href={Paths.REGISTER} passHref>
          <StyledLink>Skapa konto</StyledLink>
        </Link>
      </StyledP>
    </StyledWrapper>
  );
};

export default Login;
