import NewWorkout from '@components/NewWorkout/NewWorkout';
import { WorkoutContextProvider } from '@contexts/WorkoutContext';
import RouteHandler from '@components/RouteHandler';

const NewWorkoutPage = () => {
  return (
    <RouteHandler isProtected>
      <WorkoutContextProvider>
        <NewWorkout />
      </WorkoutContextProvider>
    </RouteHandler>
  );
};

export default NewWorkoutPage;
