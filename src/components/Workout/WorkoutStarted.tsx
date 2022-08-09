import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { WorkoutExerciseFormValues } from '@types';
import { PlusCircleIcon } from '@icons';
import Button from '@components/Button';
import WorkoutExerciseCard from '@components/Workout/WorkoutExerciseCard';
import Modal from '@components/Modal';
import { Section, SectionHeading } from './styles';
import { validationSchema } from './validationSchema';

const WorkoutHeading = styled.h3`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
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
  all: unset;
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

type Props = {
  workoutName: string;
  setWorkoutName: (workoutName: string) => void;
};

const WorkoutStarted: React.FC<Props> = ({ workoutName, setWorkoutName }) => {
  const [exercises, setExercises] = useState<WorkoutExerciseFormValues[]>([
    initialExercises,
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const cancelWorkout = () => {
    setWorkoutName('');
    setExercises([initialExercises]);
    setModalIsOpen(false);
  };

  const addExercise = () => {
    setExercises([...exercises, { ...initialExercises, id: uuidv4() }]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const cancelModal = () => {
    setModalIsOpen(false);
  };

  return (
    <WorkoutWrapper>
      {modalIsOpen && (
        <Modal
          cancel={cancelModal}
          confirm={cancelWorkout}
          message="Är du säker på att du vill avsluta träningspasset?"
          confirmBtnText="Avsluta"
        />
      )}
      <WorkoutHeading>{workoutName}</WorkoutHeading>
      <ExerciseList>
        {exercises.map((exercise) => (
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
              setExercises(updatedExercises);
              setValues({ ...values, isEditing: false });
            }}
          >
            <li key={exercise.id}>
              <WorkoutExerciseCard
                exercises={exercises}
                setExercises={setExercises}
              />
            </li>
          </Formik>
        ))}
      </ExerciseList>
      <StyledButton variant="blue" onClick={addExercise}>
        <PlusCircleIcon />
        <span>Ny övning</span>
      </StyledButton>
      <Section>
        <SectionHeading>Klar med träningspasset?</SectionHeading>
        <p>
          Klicka på “Klar” för att spara ditt träningspass, du kan gå tillbaka
          och se information om ditt träningspass på sidan för alla
          träningspass.{' '}
        </p>
        <StyledP>
          Klicka “Avbryt” för att avsluta träningspasset utan att spara det.
        </StyledP>
        <ButtonWrapper>
          <Button variant="blue">Klar</Button>
          <Button variant="red" onClick={openModal}>
            Avbryt
          </Button>
        </ButtonWrapper>
      </Section>
    </WorkoutWrapper>
  );
};

export default WorkoutStarted;
