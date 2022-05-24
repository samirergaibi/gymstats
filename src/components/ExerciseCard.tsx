import { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { DBTable } from '@constants';
import {
  EditIcon,
  FeatherIcon,
  RepetitionIcon,
  SetsIcon,
  TrashIcon,
} from '@icons';
import { uppercase } from '@utils/uppercase';
import { supabase } from '@utils/supabaseClient';
import { Exercise, ExerciseFormValues } from '@types';
import { useExerciseContext } from '@contexts/ExerciseContext';
import Modal from './Modal';

const StyledCard = styled.article`
  background-color: var(--primary);
  color: white;
  padding: 20px;
  border-radius: var(--border-medium);
`;

const StyledH4 = styled.h4`
  font-weight: var(--medium-bold);
  font-size: 1.2rem;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 15px 0;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
`;

type Props = {
  exercise: Exercise;
};

const ExerciseCard: React.FC<Props> = ({ exercise }) => {
  const { setValues } = useFormikContext<ExerciseFormValues>();
  const { setExercises, setFormIsOpen, setEditValues } = useExerciseContext();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const removeExercise = async () => {
    const { error } = await supabase
      .from(DBTable.EXERCISES)
      .delete()
      .eq('id', exercise.id);

    if (error) {
      throw new Error(error.message);
    }

    setModalIsOpen(false);
    setExercises((exercises) => exercises.filter((e) => e.id !== exercise.id));
  };

  const editExercise = () => {
    const { muscleGroups, name, reps, sets, weight } = exercise;
    setFormIsOpen(true);
    scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    setValues({
      muscleGroups: muscleGroups.toString(),
      name,
      reps: reps.toString(),
      sets: sets.toString(),
      weight: weight.toString(),
    });
    setEditValues({ isEditing: true, exerciceId: exercise.id });
  };

  return (
    <>
      {modalIsOpen && (
        <Modal cancel={setModalIsOpen} confirm={removeExercise} />
      )}
      <StyledCard key={exercise.id}>
        <StyledHeaderWrapper>
          <StyledH4>{uppercase(exercise.name)}</StyledH4>
          <ActionWrapper>
            <StyledButton onClick={openModal}>
              <TrashIcon color="black" />
            </StyledButton>
            <StyledButton onClick={editExercise}>
              <EditIcon color="black" />
            </StyledButton>
          </ActionWrapper>
        </StyledHeaderWrapper>
        <StyledGrid>
          <StyledItem>
            <RepetitionIcon />
            <p>Reps&nbsp;</p>
            <p>{exercise.reps} st</p>
          </StyledItem>
          <div />
          <StyledItem>
            <SetsIcon />
            <p>Sets&nbsp;</p>
            <p>{exercise.sets} st</p>
          </StyledItem>
          <StyledItem>
            <FeatherIcon />
            <p>Vikt&nbsp;</p>
            <p>{exercise.weight} kg</p>
          </StyledItem>
        </StyledGrid>
      </StyledCard>
    </>
  );
};

export default ExerciseCard;
