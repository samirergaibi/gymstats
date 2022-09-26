import SingleWorkout from '@components/SingleWorkout/SingleWorkout';
import ProtectedRoute from '@components/ProtectedRoute';

const SingleWorkoutPage = () => {
  return (
    <ProtectedRoute>
      <SingleWorkout />
    </ProtectedRoute>
  );
};

export default SingleWorkoutPage;
