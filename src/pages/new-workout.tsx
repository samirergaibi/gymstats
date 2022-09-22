import Workout from '@components/NewWorkout/NewWorkout';
import { WorkoutContextProvider } from '@contexts/WorkoutContext';

const NewWorkout = () => {
  // TODO: Reroute if not logged in

  return (
    <WorkoutContextProvider>
      <Workout />
    </WorkoutContextProvider>
  );
};

export default NewWorkout;
