import { NextPage } from 'next';
import styled from 'styled-components';
import { Spinner, Hero } from '@styles';
import { ExerciseContextProvider } from '@contexts/ExerciseContext';
import { useUserContext } from '@contexts/UserContext';
import ExerciseForm from '@components/Exercises/ExerciseForm';
import Exercises from '@components/Exercises/Exercises';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const ExercisesPage: NextPage = () => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <StyledWrapper>
        <Spinner />
      </StyledWrapper>
    );
  }

  return (
    <ExerciseContextProvider user={user}>
      <>
        <Hero imgUrl='/exercises-header.jpg' title='Övningar' />
        <ExerciseForm />
        <Exercises />
      </>
    </ExerciseContextProvider>
  );
};

export default ExercisesPage;
