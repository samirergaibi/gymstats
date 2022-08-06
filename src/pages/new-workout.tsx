import React, { useState } from 'react';
import styled from 'styled-components';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutExercise } from '@types';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';
import Card from '@components/Card';

const WORKOUT_NAME = 'workoutName';

const Section = styled.section`
  margin: 30px 10px;
`;

const SectionHeading = styled.h2`
  margin-bottom: 10px;
`;

const NoTemplateText = styled.p`
  font-weight: var(--medium-bold);
  text-align: center;
  text-decoration: underline;
  margin-top: 20px;
`;

const StartWorkoutForm = styled.form`
  margin-top: 15px;
  font-weight: var(--medium-bold);
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
`;

const WorkoutWrapper = styled.div`
  margin-top: 15px;
`;

const StyledP = styled.p`
  margin-top: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const ExerciseList = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const getDefaultName = () =>
  `Inget namn (${dayjs().locale('sv').format('D MMMM YYYY')})`;

const initialExercises = {
  name: '',
  reps: null,
  sets: null,
  weight: null,
  id: uuidv4(),
  isEditing: true,
};

const NewWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    initialExercises,
  ]);

  const startWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const workoutName = formData.get(WORKOUT_NAME);
    if (workoutName && typeof workoutName === 'string') {
      setWorkoutName(workoutName);
    } else {
      setWorkoutName(getDefaultName());
    }
  };

  const cancelWorkout = () => {
    setWorkoutName('');
    setExercises([initialExercises]);
  };

  const addExercise = () => {
    setExercises([...exercises, { ...initialExercises, id: uuidv4() }]);
  };

  return (
    <>
      <Hero imgUrl="/new-workout-hero.jpg" title="Nytt träningspass" />
      <Section>
        <SectionHeading>Starta från mall</SectionHeading>
        <p>
          Kör du ofta likadana träningspass, eller roterar mellan några olika?
          {/* TODO: REAL LINK */}
          <Link href="temp" spaceAfter spaceBefore>
            Skapa en mall
          </Link>
          från ett av dina tidigare träningspass för att snabbt kunna starta upp
          det träningspass du kör just idag!
        </p>
        {/* TODO: Fetch available templates and display them here */}
        {false ? (
          <div></div>
        ) : (
          <NoTemplateText>Du har inga mallar!</NoTemplateText>
        )}
      </Section>
      <Section>
        <SectionHeading>Starta nytt träningspass</SectionHeading>
        <p>
          Ingen mall? Ingen fara, du kan bygga ett träningspass as you go och
          lägga till övningar under träningspasset.
        </p>
        {workoutName ? (
          <WorkoutWrapper>
            <SectionHeading>{workoutName}</SectionHeading>
            <ExerciseList>
              {exercises.map((exercise) => (
                <li key={exercise.id}>
                  <Card
                    exercise={exercise}
                    exercises={exercises}
                    setExercises={setExercises}
                  />
                </li>
              ))}
            </ExerciseList>
            <StyledButton variant="blue" onClick={addExercise}>
              Ny övning
            </StyledButton>
            <Section>
              <SectionHeading>Klar med träningspasset?</SectionHeading>
              <p>
                Klicka på “Klar” för att spara ditt träningspass, du kan gå
                tillbaka och se information om ditt träningspass på sidan för
                alla träningspass.{' '}
              </p>
              <StyledP>
                Klicka “Avbryt” för att avsluta träningspasset utan att spara
                det.
              </StyledP>
              <ButtonWrapper>
                <Button variant="blue">Klar</Button>
                <Button variant="red" onClick={cancelWorkout}>
                  Avbryt
                </Button>
              </ButtonWrapper>
            </Section>
          </WorkoutWrapper>
        ) : (
          <StartWorkoutForm onSubmit={startWorkout}>
            <label>Namn på träningspass</label>
            <TextField
              name={WORKOUT_NAME}
              type="text"
              placeholder={getDefaultName()}
              withBorder
            />
            <StyledButton variant="blue" type="submit">
              Starta nytt
            </StyledButton>
          </StartWorkoutForm>
        )}
      </Section>
    </>
  );
};

export default NewWorkout;
