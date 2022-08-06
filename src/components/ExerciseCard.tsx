import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { Paths, DBTable } from '@constants';
import {
  ArrowRightIcon,
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
import Button from '@components/Button';
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

const StyledLinkWithIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledLink = styled.a`
  display: flex;
  gap: 3px;
  color: black;
  font-weight: var(--medium-bold);
  text-decoration: underline;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 15px;
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
            <Button variant="unstyled" onClick={openModal}>
              <TrashIcon color="black" />
            </Button>
            <Button variant="unstyled" onClick={editExercise}>
              <EditIcon color="black" />
            </Button>
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
        <StyledLinkWithIcon>
          <Link href={Paths.ROOT} passHref>
            <StyledLink>
              <span>Gå till senaste träningspasset</span>
              <ArrowRightIcon />
            </StyledLink>
          </Link>
        </StyledLinkWithIcon>
      </StyledCard>
    </>
  );
};

export default ExerciseCard;
