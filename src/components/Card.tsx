import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TrashIcon,
  SaveIcon,
  FeatherIcon,
  SetsIcon,
  RepetitionIcon,
  EditIcon,
} from '@icons';
import { WorkoutExercise } from '@types';
import Button from '@components/Button';

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--secondary);
  padding: 20px;
  border-radius: var(--border-medium);
`;

const Input = styled.input<{ small?: boolean }>`
  border-radius: 8px;
  border: 1px solid black;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  width: ${({ small }) => (small ? '100px' : 'initial')};
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  color: white;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Prefix = styled.span`
  width: 50px;
`;

const ExerciseHeading = styled.h3`
  color: white;
`;

const initialExerciseValues = {
  name: '',
  reps: '',
  sets: '',
  weight: '',
};

type Props = {
  exercise: WorkoutExercise;
  exercises: WorkoutExercise[];
  setExercises: React.Dispatch<React.SetStateAction<WorkoutExercise[]>>;
};

const Card: React.FC<Props> = ({ exercise, exercises, setExercises }) => {
  const { name, reps, sets, weight, isEditing, id } = exercise;

  const [exerciseValues, setExerciseValues] = useState(initialExerciseValues);

  const saveExercise = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExercises = exercises.map((ex) => {
      if (ex.id === id) {
        return {
          ...ex,
          name: exerciseValues.name,
          reps: +exerciseValues.reps,
          sets: +exerciseValues.sets,
          weight: +exerciseValues.weight,
          isEditing: false,
        };
      }
      return ex;
    });
    setExercises(updatedExercises);
  };

  const removeExercise = () => {
    console.log(exercises);
    if (exercises.length > 1) {
      const updatedExercises = exercises.filter((ex) => ex.id !== id);
      setExercises(updatedExercises);
    }
  };

  const editExercise = () => {
    const updatedExercises = exercises.map((ex) => {
      if (ex.id === id) {
        return {
          ...ex,
          isEditing: true,
        };
      }
      return ex;
    });
    setExercises(updatedExercises);
  };

  if (isEditing) {
    return (
      <Wrapper>
        <form onSubmit={saveExercise}>
          <TopWrapper>
            <Input
              type="text"
              placeholder="Namn på övning"
              value={exerciseValues.name}
              onChange={(e) => {
                setExerciseValues({ ...exerciseValues, name: e.target.value });
              }}
            />
            <ButtonsWrapper>
              <Button variant="unstyled" type="submit">
                <SaveIcon />
              </Button>
              <Button variant="unstyled" type="button" onClick={removeExercise}>
                <TrashIcon />
              </Button>
            </ButtonsWrapper>
          </TopWrapper>
          <BottomWrapper>
            <ValueWrapper>
              <RepetitionIcon color="white" />
              <Prefix>Reps</Prefix>
              <Input
                type="number"
                small
                value={exerciseValues.reps}
                onChange={(e) => {
                  setExerciseValues({
                    ...exerciseValues,
                    reps: e.target.value,
                  });
                }}
              />
              <span>st</span>
            </ValueWrapper>
            <ValueWrapper>
              <SetsIcon color="white" />
              <Prefix>Sets</Prefix>
              <Input
                type="number"
                small
                value={exerciseValues.sets}
                onChange={(e) => {
                  setExerciseValues({
                    ...exerciseValues,
                    sets: e.target.value,
                  });
                }}
              />
              <span>st</span>
            </ValueWrapper>
            <ValueWrapper>
              <FeatherIcon color="white" />
              <Prefix>Vikt</Prefix>
              <Input
                type="number"
                small
                value={exerciseValues.weight}
                onChange={(e) => {
                  setExerciseValues({
                    ...exerciseValues,
                    weight: e.target.value,
                  });
                }}
              />
              <span>kg</span>
            </ValueWrapper>
          </BottomWrapper>
        </form>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TopWrapper>
        <ExerciseHeading>{name}</ExerciseHeading>
        <ButtonsWrapper>
          <Button variant="unstyled" onClick={editExercise}>
            <EditIcon />
          </Button>
          <Button variant="unstyled" onClick={removeExercise}>
            <TrashIcon />
          </Button>
        </ButtonsWrapper>
      </TopWrapper>
      <BottomWrapper>
        <ValueWrapper>
          <RepetitionIcon color="white" />
          <p>
            Reps <strong>{reps || '_'}</strong> st
          </p>
        </ValueWrapper>
        <ValueWrapper>
          <SetsIcon color="white" />
          <p>
            Sets <strong>{sets || '_'}</strong> st
          </p>
        </ValueWrapper>
        <ValueWrapper>
          <FeatherIcon color="white" />
          <p>
            Vikt <strong>{weight || '_'}</strong> kg
          </p>
        </ValueWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default Card;
