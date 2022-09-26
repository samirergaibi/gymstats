import SingleWorkout from '@components/SingleWorkout/SingleWorkout';
import RouteHandler from '@components/RouteHandler';

const SingleWorkoutPage = () => {
  return (
    <RouteHandler isProtected>
      <SingleWorkout />
    </RouteHandler>
  );
};

export default SingleWorkoutPage;
