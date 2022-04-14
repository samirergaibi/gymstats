import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { protectedRoute } from '../utils/protectedRoute';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseForm from '../components/ExerciseForm';
import { supabase } from '../utils/supabaseClient';
import { Exercise } from '../types';
import { uppercase } from '../utils/uppercase';

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

const ExercisesPage: NextPage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const getExercises = async () => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('exercises')
      .select()
      .eq('userId', user?.id);

    if (error) {
      throw new Error(error.message);
    }

    setExercises(data ?? []);
  };

  useEffect(() => {
    getExercises();
  }, []);

  const categories = [
    ...new Set(
      exercises
        .map((exercise) => exercise.categories)
        .flat()
        .map((category) => category.toLowerCase()),
    ),
  ];

  console.log({ exercises, categories });

  return (
    <>
      <StyledHeaderWrapper>
        <StyledHeaderImage />
        <StyledH1>Övningar</StyledH1>
      </StyledHeaderWrapper>

      <ExerciseForm />

      <>
        <StyledH2>Dina övningar</StyledH2>
        {categories.map((category) => (
          <StyledCategoryWrapper key={category}>
            <StyledH3>{uppercase(category)}</StyledH3>
            <StyledExerciseWrapper>
              {exercises
                .filter((exercise) =>
                  exercise.categories
                    .map((category) => category.toLowerCase())
                    .includes(category),
                )
                .map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </StyledExerciseWrapper>
          </StyledCategoryWrapper>
        ))}
      </>
    </>
  );
};

export default ExercisesPage;

export const getServerSideProps = protectedRoute;
