import { NextPage } from 'next';
import Hero from '@components/Hero';
import Stats from '@components/Workouts/Stats';

const WorkoutPage: NextPage = () => {
  return (
    <>
      <Hero imgUrl="/workout-hero.jpg" title="Alla träningspass" />
      <Stats />
    </>
  );
};

export default WorkoutPage;
