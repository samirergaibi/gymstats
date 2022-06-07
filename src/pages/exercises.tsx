import { NextPage } from 'next';
import styled from 'styled-components';
import ExerciseForm from '@components/ExerciseForm';
import Exercises from '@components/Exercises';
import Spinner from '@components/Spinner';
import { ExerciseContextProvider } from '@contexts/ExerciseContext';
import { useUserContext } from '@contexts/UserContext';

const StyledHeaderWrapper = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  @media (min-width: 600px) {
    height: 400px;
    font-size: 1.2rem;
  }
`;
const StyledHeaderImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url('/exercises-header.jpg');
  background-size: cover;
  filter: grayscale(70%) contrast(150%) brightness(50%);
  background-position: center;
`;
const StyledH1 = styled.h1`
  color: white;
  position: absolute;
  top: 20%;
  left: 0;
  padding-left: 10px;
`;

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
        <StyledHeaderWrapper>
          <StyledHeaderImage />
          <StyledH1>Övningar</StyledH1>
        </StyledHeaderWrapper>
        <ExerciseForm />
        <Exercises />
      </>
    </ExerciseContextProvider>
  );
};

export default ExercisesPage;
