import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { Workout } from '@types';
import { DBTable, QueryIds } from '@constants';

export const useEditWorkout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (workout: Workout) => {
      if (!workout) {
        throw new Error('No workout found when trying to update workout!');
      }

      const { data, error } = await supabase
        .from(DBTable.WORKOUTS)
        .update({ isTemplate: !workout.isTemplate })
        .match({ id: workout.id });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryIds.WORKOUTS]);
      },
    },
  );

  return mutation;
};
