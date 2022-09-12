import { NextPage } from 'next';
import { useWorkouts } from '@hooks/queries/useWorkouts';
import Hero from '@components/Hero';
import Stats from '@components/Workouts/Stats';
import PreviousWorkouts from '@components/Workouts/PreviousWorkouts';

const WorkoutPage: NextPage = () => {
  const { data } = useWorkouts();

  return (
    <>
      <Hero imgUrl="/workout-hero.jpg" title="Alla träningspass" />
      <Stats workouts={data} />
      <PreviousWorkouts workouts={data} />
    </>
  );
};

export default WorkoutPage;
