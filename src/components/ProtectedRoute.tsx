import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useUserContext } from '@contexts/UserContext';
import { Spinner } from '@styles';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { authenticated, isClient } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated && isClient) {
      router?.replace('/login');
    }
  }, [authenticated, isClient, router]);

  if (!authenticated) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
