import { NextPage } from 'next';
import styled from 'styled-components';
import Button from '../components/Button';
import { protectedRoute } from '../utils/protectedRoute';
import ExerciseCard from '../components/ExerciseCard';

const EXERCISES_MOCK = [
  {
    categories: ['Bröst'],
    name: 'Bänkpress',
    reps: 8,
    sets: 4,
    weight: 55,
    id: 1,
    sessions: [],
  },
  {
    categories: ['Biceps'],
    name: 'Koncentrationscurl',
    reps: 8,
    sets: 4,
    weight: 12,
    id: 2,
    sessions: [],
  },
  {
    categories: ['Bröst'],
    name: 'KAKA',
    reps: 8,
    sets: 4,
    weight: 18,
    id: 3,
    sessions: [],
  },
  {
    categories: ['Biceps'],
    name: 'BABA',
    reps: 8,
    sets: 4,
    weight: 16,
    id: 4,
    sessions: [],
  },
];

const CATEGORIES_MOCK = [
  ...new Set(EXERCISES_MOCK.map((exercise) => exercise.categories).flat()),
];

const StyledHeaderWrapper = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
`;
const StyledHeaderImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url('/exercises-header.jpg');
  background-size: cover;
  filter: grayscale(60%) contrast(150%) brightness(70%);
`;
const StyledH1 = styled.h1`
  color: white;
  position: absolute;
  top: 20%;
  left: 0;
  padding-left: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;
const StyledInputWrapper = styled.div`
  margin: 10px 0;
`;
const StyledLabel = styled.label`
  font-weight: var(--medium-bold);
  color: var(--dark);
`;
const StyledInput = styled.input`
  display: block;
  border: 2px solid var(--dark);
  border-radius: 6px;
`;

const StyledH2 = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledH3 = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const StyledCategoryWrapper = styled.div`
  margin: 0 20px 20px 20px;
`;

const StyledExerciseWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  flex-direction: column;
  gap: 20px;
`;

export const getServerSideProps = protectedRoute;

const ExercisesPage: NextPage = () => {
  return (
    <div>
      <StyledHeaderWrapper>
        <StyledHeaderImage />
        <StyledH1>Övningar</StyledH1>
      </StyledHeaderWrapper>

      <StyledForm>
        <StyledH2>Lägg till en ny övning</StyledH2>
        <StyledInputWrapper>
          <StyledLabel>Kategori</StyledLabel>
          <StyledInput type="text" />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledLabel>Övning</StyledLabel>
          <StyledInput type="text" />
        </StyledInputWrapper>
        <Button variant="blue">Lägg till övning</Button>
      </StyledForm>

      <div>
        <StyledH2>Dina övningar</StyledH2>
        {CATEGORIES_MOCK.map((category) => (
          <StyledCategoryWrapper key={category}>
            <StyledH3>{category}</StyledH3>
            <StyledExerciseWrapper>
              {EXERCISES_MOCK.filter((exercise) =>
                exercise.categories.includes(category),
              ).map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </StyledExerciseWrapper>
          </StyledCategoryWrapper>
        ))}
      </div>
    </div>
  );
};

export default ExercisesPage;
