import styled from 'styled-components';
import { Skeleton, Link } from '@styles';
import { Workout } from '@types';
import { useGetWorkouts } from '@hooks/queries/useGetWorkouts';
import StatsList from '@components/StatsList';
import { durationFromSeconds } from '@utils/durationFromSeconds';
import { Paths } from '@constants';

const NoStatsBox = styled.div`
  padding: 20px;
  background: var(--yellow);
  box-shadow: var(--box-shadow-strong);
  border-radius: var(--border-medium);
  font-weight: var(--medium-bold);
  margin-top: 15px;
  & > p {
    margin-bottom: 10px;
  }
`;

const getAverageWorkoutTime = (workouts: Workout[]) => {
  const totalWorkoutTime = workouts.reduce(
    (prev, workout) => prev + workout.workoutTime,
    0,
  );
  const averageSeconds = Math.round(totalWorkoutTime / workouts.length);
  return durationFromSeconds(averageSeconds, { skipSeconds: true });
};

const AllWorkoutsStats = () => {
  const { data: workouts } = useGetWorkouts();

  if (!workouts) {
    return <Skeleton count={5} gap={20} spaceAbove />;
  }

  const noStats = workouts.length <= 0;
  if (noStats) {
    return (
      <NoStatsBox>
        <p>Du behöver ha minst ett träningspass för att se någon statistik.</p>
        <Link href={Paths.NEW_WORKOUT} withIcon>
          Starta ett träningspass
        </Link>
      </NoStatsBox>
    );
  }

  const currentYear = new Date().getFullYear();

  const workoutsThisYear = workouts.filter(
    (workout) => new Date(workout.created_at).getFullYear() === currentYear,
  );

  const dataPoints = [
    {
      text: 'Snittlängd pass',
      value: getAverageWorkoutTime(workouts) || 'Okänt',
    },
    { text: 'Träningspass i år', value: `${workoutsThisYear.length} pass` },
    { text: 'Alla träningspass', value: `${workouts.length} pass` },
  ];

  return <StatsList data={dataPoints} />;
};

export default AllWorkoutsStats;
