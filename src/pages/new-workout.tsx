import Workout from '@components/NewWorkout/NewWorkout';
import { WorkoutContextProvider } from '@contexts/WorkoutContext';
import RouteHandler from '@components/RouteHandler';

const NewWorkout = () => {
  return (
    <RouteHandler isProtected>
      <WorkoutContextProvider>
        <Workout />
      </WorkoutContextProvider>
    </RouteHandler>
  );
};

export default NewWorkout;
