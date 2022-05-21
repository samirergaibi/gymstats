import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { Paths } from '@constants';
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
import { Exercise } from '@types';
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

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
`;

type Props = {
  exercise: Exercise;
};

const ExerciseCard: React.FC<Props> = ({ exercise }) => {
  const { editExercise, setExercises } = useExerciseContext();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const removeExercise = async () => {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .match({ id: exercise.id });

    if (error) {
      throw new Error(error.message);
    }

    setModalIsOpen(false);
    setExercises((exercises) => exercises.filter((e) => e.id !== exercise.id));
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
            <StyledButton onClick={() => editExercise(exercise)}>
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
