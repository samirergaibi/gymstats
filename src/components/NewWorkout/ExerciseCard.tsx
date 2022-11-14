import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { validationSchema } from './validationSchema';

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
    <TrashIcon color={disabled ? 'rgba(60, 60, 60, 0.6)' : 'black'} size={24} />
  </Button>
);

type Props = {
  exercise: WorkoutExerciseFormValues;
  exercises: WorkoutExerciseFormValues[];
  setWorkoutExercises: (workoutExercises: WorkoutExerciseFormValues[]) => void;
};

const ExerciseCard: React.FC<Props> = ({
  exercise,
  exercises,
  setWorkoutExercises,
}) => {
  const IsOnlyOneExercise = exercises.length <= 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WorkoutExerciseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: exercise.name,
      reps: exercise.reps,
      sets: exercise.sets,
      weight: exercise.weight,
    },
  });
  const { name, reps, sets, weight } = watch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const removeExercise = () => {
    const updatedExercises = exercises.filter((ex) => ex.id !== exercise.id);
    setWorkoutExercises(updatedExercises);
  };

  const openModal = () => {
    if (exercises.length > 1) {
      setModalIsOpen(true);
    }
  };

  const editExercise = () => {
    const updatedExercises = exercises.map((ex) =>
      ex.id === exercise.id ? { ...ex, isEditing: true } : ex,
    );

    setWorkoutExercises(updatedExercises);
  };

  const cancelModal = () => {
    setModalIsOpen(false);
  };

  const saveExercise = ({
    name,
    reps,
    sets,
    weight,
  }: WorkoutExerciseFormValues) => {
    const updatedExercises = exercises.map((ex) => {
      if (ex.id === exercise.id) {
        return {
          ...ex,
          name,
          reps,
          sets,
          weight,
          isEditing: false,
        };
      }
      return ex;
    });
    setWorkoutExercises(updatedExercises);
  };

  if (exercise.isEditing) {
    return (
      <Wrapper>
        {modalIsOpen && <Modal cancel={cancelModal} confirm={removeExercise} />}
        <form onSubmit={handleSubmit(saveExercise)}>
          <TopWrapper>
            <Input
              placeholder='Namn på övning'
              type='text'
              error={!!errors.name}
              {...register('name', { required: true })}
            />
            <ButtonsWrapper>
              <Button variant='unstyled' type='submit'>
                <SaveIcon size={24} />
              </Button>
              <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
            </ButtonsWrapper>
          </TopWrapper>
          <BottomWrapper>
            <ExerciseInput
              variant='reps'
              error={!!errors.reps}
              register={register}
            />
            <ExerciseInput
              variant='sets'
              error={!!errors.sets}
              register={register}
            />
            <ExerciseInput
              variant='weight'
              error={!!errors.weight}
              register={register}
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
        <ExerciseHeading>{name}</ExerciseHeading>
        <ButtonsWrapper>
          <Button variant='unstyled' onClick={editExercise}>
            <EditIcon size={24} />
          </Button>
          <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
        </ButtonsWrapper>
      </TopWrapper>
      <BottomWrapper>
        <ValueWrapper>
          <RepetitionIcon color='white' />
          <ExerciseName>Reps</ExerciseName>
          <strong>{reps}</strong>
          <span>st</span>
        </ValueWrapper>
        <ValueWrapper>
          <SetsIcon color='white' />
          <ExerciseName>Sets</ExerciseName>
          <strong>{sets}</strong>
          <span>st</span>
        </ValueWrapper>
        <ValueWrapper>
          <FeatherIcon color='white' />
          <ExerciseName>Vikt</ExerciseName>
          <strong>{weight}</strong>
          <span>kg</span>
        </ValueWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default ExerciseCard;
