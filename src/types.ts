import React from 'react';

export type AuthenticationData = {
  email?: string;
  password?: string;
};

export type Exercise = {
  name: string;
  reps: number;
  sets: number;
  weight: number;
  id: string;
  isEditing: boolean;
};

export type Workout = {
  created_at: string;
  exercises: Exercise[];
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
  action?: () => void;
  href: string;
  text: string;
  icon?: React.ReactNode;
};

export type Stat = {
  text: string;
  value: string;
};
