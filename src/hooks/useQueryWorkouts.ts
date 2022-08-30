import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { DBTable } from '@constants';
import { Workout } from '@types';
import { useUserContext } from '@contexts/UserContext';

export const useQueryWorkouts = () => {
  const { user } = useUserContext();

  const result = useQuery<Workout[]>(['workouts'], async () => {
    const { data, error } = await supabase
      .from(DBTable.WORKOUTS)
      .select()
      .eq('userId', user?.id);

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
