import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { H2, Section } from '@styles';
import { PlusCircleIcon } from '@icons';
import Button from '@components/Button';
import WorkoutExerciseCard from '@components/Workout/WorkoutExerciseCard';
import Modal from '@components/Modal';
import { validationSchema } from './validationSchema';
import Timer from './Timer';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import { useAddWorkout } from '@hooks/mutations/useAddWorkout';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const WorkoutWrapper = styled.div`
  margin-top: 15px;
`;

const StyledP = styled.p`
  margin-top: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const SubmitError = styled.p`
  color: var(--error);
  margin-top: 10px;
  font-weight: var(--medium-bold);
`;

const initialExercises = {
  name: '',
  reps: '',
  sets: '',
  weight: '',
  id: uuidv4(),
  isEditing: true,
};

const WorkoutStarted = () => {
  const {
    workoutStorage,
    setWorkoutExercises,
    clearWorkoutStorage,
    setWorkoutStartTime,
    setWorkoutName,
  } = useWorkoutContext();
  const workoutName = workoutStorage?.workoutName;
  const exercises = workoutStorage?.exercises?.length
    ? workoutStorage.exercises
    : [initialExercises];

  // Start time in seconds
  const startTime = workoutStorage?.startTime || Date.now() / 1000;

  const mutation = useAddWorkout({ startTime, exercises });

  useEffect(() => {
    setWorkoutExercises(exercises);
    setWorkoutStartTime(startTime);
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const noExercises = workoutStorage?.exercises?.length === 0;
  const stillEditing = workoutStorage?.exercises?.some(
    (exercise) => exercise.isEditing,
  );
  useEffect(() => {
    if (!stillEditing && !noExercises) {
      setSubmitError('');
    }
  }, [stillEditing, noExercises]);

  const cancelWorkout = () => {
    setWorkoutName('');
    clearWorkoutStorage();
    setModalIsOpen(false);
  };

  const addExercise = () => {
    setWorkoutExercises([...exercises, { ...initialExercises, id: uuidv4() }]);
  };

  const submitWorkout = async () => {
    if (noExercises) {
      setSubmitError(
        'Gör åtminstone en övning innan du skickar in träningspasset.',
      );
      return;
    }

    if (stillEditing) {
      setSubmitError(
        'Du kan inte skicka in träningspasset när du håller på att redigera en övning.',
      );
      return;
    }

    mutation.mutate();
  };

  return (
    <WorkoutWrapper>
      {modalIsOpen && (
        <Modal
          cancel={() => setModalIsOpen(false)}
          confirm={cancelWorkout}
          message="Är du säker på att du vill avsluta träningspasset?"
          confirmBtnText="Avsluta"
        />
      )}
      <H2>{workoutName}</H2>
      <ExerciseList>
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
              <WorkoutExerciseCard
                exercises={exercises}
                setWorkoutExercises={setWorkoutExercises}
              />
            </Formik>
          </li>
        ))}
      </ExerciseList>
      <ButtonTimerWrapper>
        <StyledButton variant="blue" onClick={addExercise}>
          <PlusCircleIcon />
          <span>Ny övning</span>
        </StyledButton>
        <Timer startTime={startTime} />
      </ButtonTimerWrapper>
      <Section>
        <H2>Klar med träningspasset?</H2>
        <p>
          Klicka på “Klar” för att spara ditt träningspass, du kan gå tillbaka
          och se information om ditt träningspass på sidan för alla
          träningspass.{' '}
        </p>
        <StyledP>
          Klicka “Avbryt” för att avsluta träningspasset utan att spara det.
        </StyledP>
        <ButtonWrapper>
          {/* TODO: Confirm choice by modal to avoid missclick */}
          <Button variant="blue" onClick={submitWorkout}>
            Klar
          </Button>
          <Button variant="red" onClick={() => setModalIsOpen(true)}>
            Avbryt
          </Button>
        </ButtonWrapper>
        {!!submitError && <SubmitError>{submitError}</SubmitError>}
      </Section>
    </WorkoutWrapper>
  );
};

export default WorkoutStarted;
