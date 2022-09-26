import { createContext, useContext } from 'react';
import useWorkoutStorage from '@hooks/useWorkoutStorage';
import { WorkoutStorage, WorkoutExerciseFormValues } from '@types';

interface IWorkoutContext {
  workoutStorage?: WorkoutStorage;
  setWorkoutName: (workoutName: string) => void;
  setWorkoutExercises: (exercises: WorkoutExerciseFormValues[]) => void;
  setWorkoutStartTime: (workoutTime: number) => void;
  setWorkoutStorage: React.Dispatch<
    React.SetStateAction<WorkoutStorage | undefined>
  >;
  clearWorkoutStorage: () => void;
}

export const WorkoutContext = createContext<IWorkoutContext | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const WorkoutContextProvider: React.FC<Props> = ({ children }) => {
  const {
    clearWorkoutStorage,
    setWorkoutExercises,
    setWorkoutName,
    setWorkoutStartTime,
    setWorkoutStorage,
    workoutStorage,
  } = useWorkoutStorage();

  const value: IWorkoutContext = {
    clearWorkoutStorage,
    setWorkoutExercises,
    setWorkoutName,
    setWorkoutStartTime,
    setWorkoutStorage,
    workoutStorage,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkoutContext must be used within a WorkoutContext');
  }
  return context;
};

export default WorkoutContext;
