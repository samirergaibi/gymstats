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
