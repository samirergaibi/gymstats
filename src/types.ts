export type AuthenticationData = {
  email?: string;
  password?: string;
};

export type Exercise = {
  categories: string[];
  name: string;
  reps: number;
  sets: number;
  weight: number;
  id: string;
};
