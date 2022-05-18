import { NextPage } from 'next';
import styled from 'styled-components';
import { protectedRoute } from '@utils/protectedRoute';

const StyledP = styled.p`
  font-weight: var(--medium-bold);
  font-size: 18px;
  color: var(--error);
  margin-top: 40px;
  text-align: center;
`;

const ConstructionWorker = styled.span`
  font-size: 24px;
  margin-left: 5px;
`;

export const getServerSideProps = protectedRoute;

const WorkoutPage: NextPage = () => {
  return (
    <div>
      <h1>Dina träningspass!</h1>
      <StyledP>
        <u>Under konstruktion!</u>
        <ConstructionWorker>&#128119;</ConstructionWorker>
      </StyledP>
    </div>
  );
};

export default WorkoutPage;
