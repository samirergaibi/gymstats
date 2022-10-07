import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import ExerciseCard from './ExerciseCard';
import { validationSchema } from './validationSchema';

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
          <Formik
            validationSchema={validationSchema}
            initialValues={exercise}
            onSubmit={(values, { setValues }) => {
              const updatedExercises = exercises.map((ex) => {
                if (ex.id === values.id) {
                  return {
                    ...ex,
                    name: values.name,
                    reps: values.reps,
                    sets: values.sets,
                    weight: values.weight,
                    isEditing: false,
                  };
                }
                return ex;
              });
              setWorkoutExercises(updatedExercises);
              setValues({ ...values, isEditing: false });
            }}
          >
            <ExerciseCard
              exercises={exercises}
              setWorkoutExercises={setWorkoutExercises}
            />
          </Formik>
        </li>
      ))}
    </StyledList>
  );
};

export default ExerciseList;
