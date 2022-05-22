export const formatMuscleGroups = (muscleGroups: string) => {
  return muscleGroups
    .split(',')
    .map((muscleGroup) => muscleGroup.toLowerCase().trim())
    .filter(Boolean);
};
