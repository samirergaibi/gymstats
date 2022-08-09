import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import {
  TrashIcon,
  SaveIcon,
  FeatherIcon,
  SetsIcon,
  RepetitionIcon,
  EditIcon,
} from '@icons';
import { WorkoutExerciseFormValues } from '@types';
import Button from '@components/Button';
import Modal from '@components/Modal';
import WorkoutExerciseInput from '@components/Workout/WorkoutExerciseInput';
import { Input } from './styles';

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

const TrashButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  disabled,
}) => (
  <Button
    type="button"
    variant="unstyled"
    onClick={onClick}
    disabled={disabled}
  >
    <TrashIcon color={disabled ? 'rgba(60, 60, 60, 0.6)' : 'black'} />
  </Button>
);

type Props = {
  exercises: WorkoutExerciseFormValues[];
  setExercises: React.Dispatch<
    React.SetStateAction<WorkoutExerciseFormValues[]>
  >;
};

const WorkoutExerciseCard: React.FC<Props> = ({ exercises, setExercises }) => {
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
    setExercises(updatedExercises);
  };

  const openModal = () => {
    if (exercises.length > 1) {
      setModalIsOpen(true);
    }
  };

  const editExercise = () => {
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
              placeholder="Namn på övning"
              type="text"
              name="name"
              value={values.name}
              error={!!touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ButtonsWrapper>
              <Button variant="unstyled" type="submit">
                <SaveIcon />
              </Button>
              <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
            </ButtonsWrapper>
          </TopWrapper>
          <BottomWrapper>
            <WorkoutExerciseInput
              variant="reps"
              value={values.reps}
              error={!!touched.reps && !!errors.reps}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <WorkoutExerciseInput
              variant="sets"
              value={values.sets}
              error={!!touched.sets && !!errors.sets}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <WorkoutExerciseInput
              variant="weight"
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
          <Button variant="unstyled" onClick={editExercise}>
            <EditIcon />
          </Button>
          <TrashButton onClick={openModal} disabled={IsOnlyOneExercise} />
        </ButtonsWrapper>
      </TopWrapper>
      <BottomWrapper>
        <ValueWrapper>
          <RepetitionIcon color="white" />
          <p>
            Reps <strong>{values.reps || '_'}</strong> st
          </p>
        </ValueWrapper>
        <ValueWrapper>
          <SetsIcon color="white" />
          <p>
            Sets <strong>{values.sets || '_'}</strong> st
          </p>
        </ValueWrapper>
        <ValueWrapper>
          <FeatherIcon color="white" />
          <p>
            Vikt <strong>{values.weight || '_'}</strong> kg
          </p>
        </ValueWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default WorkoutExerciseCard;
