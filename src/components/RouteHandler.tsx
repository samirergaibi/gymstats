import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Paths } from '@constants';
import { useUserContext } from '@contexts/UserContext';
import { Spinner } from '@styles';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

type Props = {
  children: React.ReactNode;
  isProtected: boolean;
};

const RouteHandler: React.FC<Props> = ({ children, isProtected }) => {
  const { authenticated } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (authenticated && !isProtected) {
      router.replace(Paths.NEW_WORKOUT);
    }
    if (!authenticated && isProtected) {
      router.replace(Paths.LOGIN);
    }
  }, [authenticated, router, isProtected]);

  const pageShouldBeHidden = isProtected ? !authenticated : authenticated;
  if (pageShouldBeHidden) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    );
  }

  return <>{children}</>;
};

export default RouteHandler;
