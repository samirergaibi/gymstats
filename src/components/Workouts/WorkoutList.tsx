import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import styled from 'styled-components';
import { P } from '@styles';
import { Workout } from '@types';
import { StarIcon } from '@icons';
import Link from '@components/Link';
import { useEditWorkout } from '@hooks/mutations/useEditWorkout';
import { useWorkouts } from '@hooks/queries/useWorkouts';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Workout = styled.li`
  margin-bottom: 50px;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  padding-right: 10px;
`;

const StyledStarIcon = styled(StarIcon)<{ $isLoading: boolean }>`
  transform: ${({ $isLoading }) => ($isLoading ? 'rotate(360deg)' : 'initial')};
  transition: transform 2s;
`;

const WorkoutList = () => {
  const { data: workouts } = useWorkouts();
  const { isLoading, mutate } = useEditWorkout();

  if (!workouts) {
    return null;
  }

  const updateWorkoutTemplate = (workout: Workout) => {
    mutate(workout);
  };

  return (
    <List>
      {workouts.map((workout) => {
        const formattedDate = dayjs(workout.created_at)
          .locale('sv')
          .format('D MMMM YYYY');

        const exerciseNames = workout.exercises
          .slice(0, 3)
          .map((exercise) => exercise.name);

        const workoutBreadText = `Träningspasset innehåller övningar som ${exerciseNames.join(
          ', ',
        )}...`;

        return (
          <Workout key={workout.id}>
            <TitleWrapper>
              <StyledButton
                disabled={isLoading}
                onClick={() => updateWorkoutTemplate(workout)}
              >
                <StyledStarIcon
                  $isLoading={isLoading}
                  color="var(--yellow)"
                  filled={workout.isTemplate}
                />
              </StyledButton>
              <h3>{formattedDate}</h3>
            </TitleWrapper>
            <div>
              <strong>{workout.workoutName}</strong>
              <P spaceBottom>{workoutBreadText}</P>
            </div>
            {/* TODO: add real link to real page */}
            <Link href="/hehe" withIcon>
              Gå till övning
            </Link>
          </Workout>
        );
      })}
    </List>
  );
};

export default WorkoutList;
