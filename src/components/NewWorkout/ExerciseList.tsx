import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import ExerciseCard from './ExerciseCard';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const initialExercises = {
  name: '',
  reps: '',
  sets: '',
  weight: '',
  id: uuidv4(),
  isEditing: true,
};

const ExerciseList = () => {
  const { workoutStorage, setWorkoutExercises } = useWorkoutContext();
  const exercises = workoutStorage?.exercises?.length
    ? workoutStorage.exercises
    : [initialExercises];

  return (
    <StyledList>
      {exercises.map((exercise) => (
        <li key={exercise.id}>
          <ExerciseCard
            exercise={exercise}
            exercises={exercises}
            setWorkoutExercises={setWorkoutExercises}
          />
        </li>
      ))}
    </StyledList>
  );
};

export default ExerciseList;
