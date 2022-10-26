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
  const { user, isFetched } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    if (user && !isProtected) {
      router.replace(Paths.NEW_WORKOUT);
    }
    if (!user && isProtected) {
      router.replace(Paths.LOGIN);
    }
  }, [user, router, isProtected, isFetched]);

  const pageShouldBeHidden = isProtected ? !user : !!user;
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
