import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Paths } from '@constants';
import RegisterForm from '@components/RegisterForm';
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
`;

const Separator = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 60%;
  margin: 20px;
`;

const StyledP = styled.p`
  margin-top: 10px;
`;

const StyledLink = styled.a`
  color: var(--blue);
  text-decoration: underline;
`;

const Register: NextPage = () => {
  return (
    <RouteHandler isProtected={false}>
      <StyledWrapper>
        <StyledH1>Skapa konto hos GymStat!</StyledH1>
        <Separator />
        <RegisterForm />
        <StyledP>
          Har du redan ett konto?{' '}
          <Link href={Paths.LOGIN} passHref>
            <StyledLink>Logga in</StyledLink>
          </Link>
        </StyledP>
      </StyledWrapper>
    </RouteHandler>
  );
};

export default Register;
