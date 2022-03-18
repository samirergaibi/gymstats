import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import arrowRightSvg from '../assets/arrow-right.svg';
import featherSvg from '../assets/feather.svg';
import setsSvg from '../assets/sets.svg';
import repsSvg from '../assets/reps.svg';
import { Exercise } from '../types';

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

type Props = {
  exercise: Exercise;
};

const ExerciseCard: React.FC<Props> = ({ exercise }) => {
  return (
    <StyledCard key={exercise.id}>
      <StyledH4>{exercise.name}</StyledH4>
      <StyledGrid>
        <StyledItem>
          <Image alt="Dumbells illustration" src={repsSvg} />
          <p>Reps&nbsp;</p>
          <p>{exercise.reps} st</p>
        </StyledItem>
        <div />
        <StyledItem>
          <Image alt="Dumbells illustration" src={setsSvg} />
          <p>Sets&nbsp;</p>
          <p>{exercise.sets} st</p>
        </StyledItem>
        <StyledItem>
          <Image alt="Dumbells illustration" src={featherSvg} />
          <p>Vikt&nbsp;</p>
          <p>{exercise.weight} kg</p>
        </StyledItem>
      </StyledGrid>
      <StyledLinkWithIcon>
        <Link href="/" passHref>
          <StyledLink>
            <span>Gå till senaste träningspasset</span>
            <Image alt="Dumbells illustration" src={arrowRightSvg} />
          </StyledLink>
        </Link>
      </StyledLinkWithIcon>
    </StyledCard>
  );
};

export default ExerciseCard;
