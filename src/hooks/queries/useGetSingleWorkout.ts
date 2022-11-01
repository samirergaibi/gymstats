import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { DBTable } from '@constants';
import { Workout } from '@types';
import { useUserContext } from '@contexts/UserContext';

export const useGetSingleWorkout = (workoutId: string) => {
  const { user } = useUserContext();

  const result = useQuery<Workout>(
    ['single-workout', workoutId],
    async () => {
      if (!user?.id) {
        throw new Error(
          'No user id provided while trying to fetch single workout',
        );
      }

      const { data, error } = await supabase
        .from(DBTable.WORKOUTS)
        .select()
        .eq('userId', user.id)
        .eq('id', workoutId)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return { ...data, exercises: JSON.parse(data.exercises) };
    },
    {
      enabled: !!workoutId,
    },
  );

  return result;
};
