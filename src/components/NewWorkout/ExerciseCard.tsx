import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { Button, Modal } from '@styles';
import {
  TrashIcon,
  SaveIcon,
  FeatherIcon,
  SetsIcon,
  RepetitionIcon,
  EditIcon,
} from '@icons';
import { WorkoutExerciseFormValues } from '@types';
import ExerciseInput, { Input } from './ExerciseInput';

const Wrapper = styled.div`
  background-color: var(--secondary);
  padding: 20px;
  border-radius: var(--border-medium);
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 15px;
  color: white;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ExerciseHeading = styled.h3`
  color: white;
`;

const ExerciseName = styled.span`
  width: 45px;
`;

const TrashButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  disabled,
}) => (
  <Button
    type='button'
    variant='unstyled'
    onClick={onClick}
    disabled={disabled}
  >
    <TrashIcon color={disabled ? 'rgba(60, 60, 60, 0.6)' : 'black'} />
  </Button>
);

type Props = {
  exercises: WorkoutExerciseFormValues[];
  setWorkoutExercises: (workoutExercises: WorkoutExerciseFormValues[]) => void;
};

const ExerciseCard: React.FC<Props> = ({ exercises, setWorkoutExercises }) => {
  const IsOnlyOneExercise = exercises.length <= 1;

  const {
    values,
    errors,
    touched,
    handleChange,
    setValues,
    handleSubmit,
    handleBlur,
  } = useFormikContext<WorkoutExerciseFormValues>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const removeExercise = () => {
    const updatedExercises = exercises.filter((ex) => ex.id !== values.id);
    setWorkoutExercises(updatedExercises);
  };

  const openModal = () => {
    if (exercises.length > 1) {
      setModalIsOpen(true);
    }
  };

  const editExercise = () => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === values.id ? { ...exercise, isEditing: true } : exercise,
    );
    setWorkoutExercises(updatedExercises);
    setValues({ ...values, isEditing: true });
  };

  const cancelModal = () => {
    setModalIsOpen(false);
  };

  if (values.isEditing) {
    return (
      <Wrapper>
        {modalIsOpen && <Modal cancel={cancelModal} confirm={removeExercise} />}
        <form onSubmit={handleSubmit}>
          <TopWrapper>
            <Input
              placeholder='Namn på övning'
              type='text'
              name='name'
              value={values.name}
              error={!!touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ButtonsWrapper>
              <Button variant='unstyled' type='submit'>
                <SaveIcon />
              </Button>
              <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
            </ButtonsWrapper>
          </TopWrapper>
          <BottomWrapper>
            <ExerciseInput
              variant='reps'
              value={values.reps}
              error={!!touched.reps && !!errors.reps}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ExerciseInput
              variant='sets'
              value={values.sets}
              error={!!touched.sets && !!errors.sets}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ExerciseInput
              variant='weight'
              value={values.weight}
              error={!!touched.weight && !!errors.weight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </BottomWrapper>
        </form>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {modalIsOpen && <Modal cancel={cancelModal} confirm={removeExercise} />}
      <TopWrapper>
        <ExerciseHeading>{values.name}</ExerciseHeading>
        <ButtonsWrapper>
          <Button variant='unstyled' onClick={editExercise}>
            <EditIcon />
          </Button>
          <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
        </ButtonsWrapper>
      </TopWrapper>
      <BottomWrapper>
        <ValueWrapper>
          <RepetitionIcon color='white' />
          <ExerciseName>Reps</ExerciseName>
          <strong>{values.reps}</strong>
          <span>st</span>
        </ValueWrapper>
        <ValueWrapper>
          <SetsIcon color='white' />
          <ExerciseName>Sets</ExerciseName>
          <strong>{values.sets}</strong>
          <span>st</span>
        </ValueWrapper>
        <ValueWrapper>
          <FeatherIcon color='white' />
          <ExerciseName>Vikt</ExerciseName>
          <strong>{values.weight}</strong>
          <span>kg</span>
        </ValueWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default ExerciseCard;