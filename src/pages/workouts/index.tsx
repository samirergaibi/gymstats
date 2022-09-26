import { NextPage } from 'next';
import Hero from '@components/Hero';
import Stats from '@components/Workouts/Stats';
import PreviousWorkouts from '@components/Workouts/PreviousWorkouts';
import RouteHandler from '@components/RouteHandler';

const WorkoutPage: NextPage = () => {
  return (
    <RouteHandler isProtected>
      <Hero imgUrl="/workout-hero.jpg" title="Alla träningspass" />
      <Stats />
      <PreviousWorkouts />
    </RouteHandler>
  );
};

export default WorkoutPage;
