import { NextPage } from 'next';
import styled from 'styled-components';
import ExerciseForm from '@components/ExerciseForm';
import Exercises from '@components/Exercises';
import { protectedRoute } from '@utils/protectedRoute';
import { ExerciseContextProvider } from '@contexts/ExerciseContext';

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

export const getServerSideProps = protectedRoute;

const ExercisesPage: NextPage = () => (
  <ExerciseContextProvider>
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

export default ExercisesPage;
