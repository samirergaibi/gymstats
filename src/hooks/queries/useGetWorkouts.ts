import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { DBTable, QueryIds } from '@constants';
import { Workout } from '@types';
import { useUserContext } from '@contexts/UserContext';

export const useGetWorkouts = () => {
  const { user } = useUserContext();

  const result = useQuery<Workout[]>([QueryIds.WORKOUTS], async () => {
    const { data, error } = await supabase
      .from(DBTable.WORKOUTS)
      .select()
      .eq('userId', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const normalizedWorkouts = data.map((workout) => ({
      ...workout,
      exercises: JSON.parse(workout.exercises),
    }));
    return normalizedWorkouts;
  });

  return result;
};
