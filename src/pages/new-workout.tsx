import React, { useState } from 'react';
import styled from 'styled-components';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';
import WorkoutStarted from '@components/Workout/WorkoutStarted';
import { Section, WorkoutHeading } from '@components/Workout/styles';

const WORKOUT_NAME = 'workoutName';

const NoTemplateText = styled.p`
  font-style: italic;
  font-weight: var(--medium-bold);
  margin-top: 15px;
`;

const StartWorkoutForm = styled.form`
  margin-top: 15px;
  font-weight: var(--medium-bold);
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StartedText = styled.p`
  font-style: italic;
  font-weight: var(--medium-bold);
  margin-top: 15px;
`;

const getDefaultName = () =>
  `Inget namn (${dayjs().locale('sv').format('D MMMM YYYY')})`;

const NewWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');

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

  return (
    <>
      <Hero imgUrl="/new-workout-hero.jpg" title="Nytt träningspass" />
      <Section>
        <WorkoutHeading>Starta från mall</WorkoutHeading>
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
        <WorkoutHeading>Starta nytt träningspass</WorkoutHeading>
        <p>
          Ingen mall? Ingen fara, du kan bygga ett träningspass as you go och
          lägga till övningar under träningspasset.
        </p>
        {workoutName && (
          <StartedText>Du har påbörjat ett träningspass 👇</StartedText>
        )}
        {!workoutName && (
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
      {workoutName && (
        <Section>
          <WorkoutStarted
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          />
        </Section>
      )}
    </>
  );
};

export default NewWorkout;
