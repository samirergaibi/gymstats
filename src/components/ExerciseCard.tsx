import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import arrowRightSvg from '../assets/arrow-right.svg';
import featherSvg from '../assets/feather.svg';
import setsSvg from '../assets/sets.svg';
import repsSvg from '../assets/reps.svg';
import trashSvg from '../assets/trash.svg';
import { Exercise } from '../types';
import { uppercase } from '../utils/uppercase';
import { supabase } from '../utils/supabaseClient';

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

const StyledTrash = styled(Image)`
  color: red;
  fill: red;
  stroke: red;
  currentcolor: red;
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
`;

type Props = {
  exercise: Exercise;
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

const ExerciseCard: React.FC<Props> = ({ exercise, setExercises }) => {
  const removeExercise = async () => {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .match({ id: exercise.id });

    if (error) {
      throw new Error(error.message);
    }

    setExercises((exercises) => exercises.filter((e) => e.id !== exercise.id));
  };

  return (
    <StyledCard key={exercise.id}>
      <StyledHeaderWrapper>
        <StyledH4>{uppercase(exercise.name)}</StyledH4>
        <StyledButton onClick={removeExercise}>
          <StyledTrash alt="Trash icon" src={trashSvg} />
        </StyledButton>
      </StyledHeaderWrapper>
      <StyledGrid>
        <StyledItem>
          <Image alt="Repetition icon" src={repsSvg} />
          <p>Reps&nbsp;</p>
          <p>{exercise.reps} st</p>
        </StyledItem>
        <div />
        <StyledItem>
          <Image alt="Lightning icon" src={setsSvg} />
          <p>Sets&nbsp;</p>
          <p>{exercise.sets} st</p>
        </StyledItem>
        <StyledItem>
          <Image alt="Feather icon" src={featherSvg} />
          <p>Vikt&nbsp;</p>
          <p>{exercise.weight} kg</p>
        </StyledItem>
      </StyledGrid>
      <StyledLinkWithIcon>
        <Link href="/" passHref>
          <StyledLink>
            <span>Gå till senaste träningspasset</span>
            <Image alt="Arrow pointing right icon" src={arrowRightSvg} />
          </StyledLink>
        </Link>
      </StyledLinkWithIcon>
    </StyledCard>
  );
};

export default ExerciseCard;
