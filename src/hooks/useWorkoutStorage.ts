import { useState, useEffect } from 'react';
import { WorkoutStorage, WorkoutExerciseFormValues } from '@types';

const WORKOUT_STORAGE_KEY = 'workoutStorage';

const initialValue = {
  exercises: [],
  isTemplate: false,
  workoutName: '',
  startTime: 0,
};

const useWorkoutStorage = () => {
  const [workoutStorage, setWorkoutStorage] = useState<WorkoutStorage>();

  useEffect(() => {
    const value = localStorage.getItem(WORKOUT_STORAGE_KEY);
    const existingValue =
      value && value !== 'undefined' ? JSON.parse(value) : null;

    if (existingValue) {
      setWorkoutStorage(existingValue);
    } else {
      setWorkoutStorage(initialValue);
    }
  }, []);

  useEffect(() => {
    if (workoutStorage) {
      localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workoutStorage));
    }
  }, [workoutStorage]);

  const setWorkoutName = (workoutName: string) => {
    setWorkoutStorage({ ...workoutStorage, workoutName });
  };

  const setWorkoutExercises = (exercises: WorkoutExerciseFormValues[]) => {
    setWorkoutStorage({ ...workoutStorage, exercises });
  };

  const setWorkoutStartTime = (startTime: number) => {
    setWorkoutStorage({ ...workoutStorage, startTime });
  };

  const clearWorkoutStorage = () => {
    setWorkoutStorage(initialValue);
  };

  return {
    workoutStorage,
    setWorkoutStorage,
    clearWorkoutStorage,
    setWorkoutName,
    setWorkoutExercises,
    setWorkoutStartTime,
  };
};

export default useWorkoutStorage;
