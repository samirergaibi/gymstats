import Workout from '@components/Workout/NewWorkout';
import { WorkoutContextProvider } from '@contexts/WorkoutContext';

const NewWorkout = () => {
  return (
    <WorkoutContextProvider>
      <Workout />
    </WorkoutContextProvider>
  );
};

export default NewWorkout;
