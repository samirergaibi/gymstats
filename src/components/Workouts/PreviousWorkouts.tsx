import styled from 'styled-components';
import { H2, Section, P } from '@styles';
import { Workout } from '@types';
import TipBox from './TipBox';
import WorkoutItem from './WorkoutItem';

const WorkoutList = styled.ul`
  list-style: none;
  padding: 0;
`;

type Props = {
  workouts?: Workout[];
};

const PreviousWorkouts: React.FC<Props> = ({ workouts }) => {
  return (
    <Section>
      <H2>Tidigare träningspass</H2>
      <P spaceBottom>
        Här kan du se alla de tidigare träningspassen som du har kört! Du kan
        även navigera till respektive träningspass för att se mer information.
      </P>
      <TipBox />
      {workouts && (
        <WorkoutList>
          {workouts.map((workout) => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))}
        </WorkoutList>
      )}
    </Section>
  );
};

export default PreviousWorkouts;
