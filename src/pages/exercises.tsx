import { NextPage } from 'next';
import styled from 'styled-components';
import { Spinner } from '@styles';
import ExerciseForm from '@components/ExerciseForm';
import Exercises from '@components/Exercises';
import Hero from '@components/Hero';
import { ExerciseContextProvider } from '@contexts/ExerciseContext';
import { useUserContext } from '@contexts/UserContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const ExercisesPage: NextPage = () => {
  const { authenticated, user } = useUserContext();

  if (!authenticated || !user) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    );
  }

  return (
    <ExerciseContextProvider user={user}>
      <>
        <Hero imgUrl="/exercises-header.jpg" title="Övningar" />
        <ExerciseForm />
        <Exercises />
      </>
    </ExerciseContextProvider>
  );
};

export default ExercisesPage;
