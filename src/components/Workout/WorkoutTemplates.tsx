import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Workout, WorkoutStorage } from '@types';
import Button from '@components/Button';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 15px;
`;

const StyledButton = styled(Button)<{ moreThanOne: boolean }>`
  padding: 5px 20px;
  border: 1px solid var(--light-gray);
  border-radius: 20px;
  font-size: 0.8rem;
  text-align: center;
  flex-grow: ${({ moreThanOne }) => (moreThanOne ? 1 : 0)};
  @media (min-width: 1000px) {
    flex-grow: 0;
  }
`;

type Props = {
  templates: Workout[];
  setWorkoutStorage: React.Dispatch<
    React.SetStateAction<WorkoutStorage | undefined>
  >;
};

const WorkoutTemplates: React.FC<Props> = ({
  templates,
  setWorkoutStorage,
}) => {
  return (
    <Wrapper>
      {templates.map(({ workoutName, exercises }) => (
        <StyledButton
          moreThanOne={templates.length > 1}
          variant="unstyled"
          onClick={() => {
            setWorkoutStorage((storage) => ({
              ...storage,
              workoutName,
              exercises: exercises.map(({ name, reps, sets, weight }) => ({
                name: name,
                reps: reps.toString(),
                sets: sets.toString(),
                weight: weight.toString(),
                id: uuidv4(),
                isEditing: true,
              })),
            }));
          }}
        >
          {workoutName}
        </StyledButton>
      ))}
    </Wrapper>
  );
};

export default WorkoutTemplates;
