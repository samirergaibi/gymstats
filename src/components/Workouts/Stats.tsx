import styled from 'styled-components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { H2, Section } from '@styles';
import { Workout } from '@types*';

dayjs.extend(duration);

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.div`
  font-weight: var(--medium-bold);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`;

const StyledHr = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid var(--light-gray);
`;

const getAverageWorkoutTime = (workouts: Workout[]) => {
  const totalWorkoutTime = workouts.reduce(
    (prev, workout) => prev + workout.workoutTime,
    0,
  );
  const averageSeconds = Math.round(totalWorkoutTime / workouts.length);
  const hours = dayjs.duration(averageSeconds, 'seconds').hours();
  const minutes = dayjs.duration(averageSeconds, 'seconds').minutes();
  return `${hours}h ${minutes}min`;
};

type Props = {
  workouts?: Workout[];
};

const Stats: React.FC<Props> = ({ workouts }) => {
  if (!workouts) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const workoutsThisYear = workouts.filter(
    (workout) => new Date(workout.created_at).getFullYear() === currentYear,
  );

  const dataPoints = [
    {
      text: 'Snittlängd pass',
      value: getAverageWorkoutTime(workouts),
    },
    { text: 'Träningspass i år', value: `${workoutsThisYear.length} pass` },
    { text: 'Alla träningspass', value: `${workouts.length} pass` },
  ];

  return (
    <Section>
      <H2>Statistik över din träning</H2>
      <p>
        Hur länge brukar du träna i snitt? Hur många gånger har du tränat i år?
        Detta är några av de frågor vi kan hjälpa dig att ta reda på!
      </p>
      <StatsList>
        {dataPoints.map(({ text, value }, i) => (
          <li key={`${text}-${value}`}>
            <ListItem>
              <p>{text}</p>
              <p>👉</p>
              <p>{value}</p>
            </ListItem>
            {i !== dataPoints.length - 1 && <StyledHr />}
          </li>
        ))}
      </StatsList>
    </Section>
  );
};

export default Stats;
