import { NextPage } from 'next';
import Hero from '@components/Hero';
import Stats from '@components/Workouts/Stats';
import PreviousWorkouts from '@components/Workouts/PreviousWorkouts';

const WorkoutPage: NextPage = () => {
  // TODO: Reroute if not logged in

  return (
    <>
      <Hero imgUrl="/workout-hero.jpg" title="Alla träningspass" />
      <Stats />
      <PreviousWorkouts />
    </>
  );
};

export default WorkoutPage;
