import { H2, Section } from '@styles';
import AllWorkoutsStats from './AllWorkoutsStats';

const Stats = () => {
  return (
    <Section>
      <H2>Statistik över din träning</H2>
      <p>
        Hur länge brukar du träna i snitt? Hur många gånger har du tränat i år?
        Detta är några av de frågor vi kan hjälpa dig att ta reda på!
      </p>
      <AllWorkoutsStats />
    </Section>
  );
};

export default Stats;
