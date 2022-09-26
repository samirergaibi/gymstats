import { H2, Section, P } from '@styles';
import TipBox from './TipBox';
import WorkoutList from './WorkoutList';

const PreviousWorkouts = () => {
  return (
    <Section>
      <H2>Tidigare träningspass</H2>
      <P spaceBottom>
        Här kan du se alla de tidigare träningspassen som du har kört! Du kan
        även navigera till respektive träningspass för att se mer information.
      </P>
      <TipBox />
      <WorkoutList />
    </Section>
  );
};

export default PreviousWorkouts;
