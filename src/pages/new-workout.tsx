import Workout from '@components/NewWorkout/NewWorkout';
import { WorkoutContextProvider } from '@contexts/WorkoutContext';
import ProtectedRoute from '@components/ProtectedRoute';

const NewWorkout = () => {
  return (
    <ProtectedRoute>
      <WorkoutContextProvider>
        <Workout />
      </WorkoutContextProvider>
    </ProtectedRoute>
  );
};

export default NewWorkout;
