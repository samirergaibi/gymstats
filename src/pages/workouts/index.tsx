import { NextPage } from 'next';
import Hero from '@components/Hero';
import Stats from '@components/Workouts/Stats';
import PreviousWorkouts from '@components/Workouts/PreviousWorkouts';
import ProtectedRoute from '@components/ProtectedRoute';

const WorkoutPage: NextPage = () => {
  return (
    <ProtectedRoute>
      <Hero imgUrl="/workout-hero.jpg" title="Alla träningspass" />
      <Stats />
      <PreviousWorkouts />
    </ProtectedRoute>
  );
};

export default WorkoutPage;
