export type AuthenticationData = {
  email?: string;
  password?: string;
};

export type Exercise = {
  muscleGroups: string[];
  name: string;
  reps: number;
  sets: number;
  weight: number;
  id: string;
};

export type ExerciseFormValues = {
  muscleGroups: string;
  name: string;
  reps: string;
  sets: string;
  weight: string;
};

// Temporary until decided how to proceed with workouts & exercises
type TempExercise = Omit<Exercise, 'muscleGroups'> & {
  idEditing: boolean;
  id: string;
};

export type Workout = {
  exercises: TempExercise[];
  isTemplate: boolean;
  workoutName: string;
  workoutTime: number;
  id: number;
  userId: string;
};

export type WorkoutExerciseFormValues = {
  name: string;
  reps: string;
  sets: string;
  weight: string;
  id: string;
  isEditing: boolean;
};

export type WorkoutStorage = {
  exercises?: WorkoutExerciseFormValues[];
  isTemplate?: boolean;
  startTime?: number;
  workoutName?: string;
};

export type Routes = {
  action?: Function;
  href: string;
  text: string;
};
