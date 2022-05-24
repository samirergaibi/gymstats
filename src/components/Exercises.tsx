import styled from 'styled-components';
import ExerciseCard from '@components/ExerciseCard';
import { uppercase } from '@utils/uppercase';
import { useExerciseContext } from '@contexts/ExerciseContext';

const StyledH2 = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledH3 = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-decoration: underline;
`;

const StyledMuscleGroupsWrapper = styled.div`
  margin: 0 20px 20px 20px;
`;

const StyledExerciseWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  flex-direction: column;
  gap: 20px;
`;

const StyledP = styled.p`
  padding: 0 20px 20px;
  text-align: center;
`;

const Exercises = () => {
  const { exercises } = useExerciseContext();

  const muscleGroups = [
    ...new Set(
      exercises
        .map((exercise) => exercise.muscleGroups)
        .flat()
        .map((muscleGroup) => muscleGroup.toLowerCase()),
    ),
  ].sort();

  return (
    <>
      <StyledH2>Dina övningar</StyledH2>
      {muscleGroups.length === 0 ? (
        <StyledP>
          Du har inga övningar ännu men du kan lägga till en ovanför! &#128170;
        </StyledP>
      ) : (
        muscleGroups.map((muscleGroup) => (
          <StyledMuscleGroupsWrapper key={muscleGroup}>
            <StyledH3>{uppercase(muscleGroup)}</StyledH3>
            <StyledExerciseWrapper>
              {exercises
                .filter((exercise) =>
                  exercise.muscleGroups
                    .map((muscleGroup) => muscleGroup.toLowerCase())
                    .includes(muscleGroup),
                )
                .map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </StyledExerciseWrapper>
          </StyledMuscleGroupsWrapper>
        ))
      )}
    </>
  );
};

export default Exercises;
