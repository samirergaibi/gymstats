import { useMutation } from '@tanstack/react-query';
import { DBTable } from '@constants';
import { WorkoutExerciseFormValues } from '@types';
import { supabase } from '@utils/supabaseClient';
import { useUserContext } from '@contexts/UserContext';
import { useWorkoutContext } from '@contexts/WorkoutContext';

type Args = {
  startTime: number;
  exercises: WorkoutExerciseFormValues[];
};

export const useMutationAddWorkout = ({ startTime, exercises }: Args) => {
  const { user } = useUserContext();
  const { workoutStorage, clearWorkoutStorage } = useWorkoutContext();

  const { workoutName } = workoutStorage ?? {};

  const mutation = useMutation(
    async () => {
      if (!user) {
        throw new Error('No user found');
      }

      // Total workout time in seconds
      const workoutTime = Math.floor(Date.now() / 1000 - startTime);
      const { data, error } = await supabase.from(DBTable.WORKOUTS).insert({
        exercises: JSON.stringify(exercises),
        workoutName,
        isTemplate: false,
        workoutTime,
        userId: user.id,
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        clearWorkoutStorage();
      },
    },
  );

  return mutation;
};
