import { Skeleton } from '@styles';
import { Workout } from '@types';
import { useGetWorkouts } from '@hooks/queries/useGetWorkouts';
import StatsList from '@components/StatsList';
import { durationFromSeconds } from '@utils/durationFromSeconds';

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

  return <StatsList data={dataPoints} />;
};

export default AllWorkoutsStats;
