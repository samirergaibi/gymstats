import React, { useState } from 'react';
import styled from 'styled-components';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';
import WorkoutStarted from '@components/Workout/WorkoutStarted';
import { Section, SectionHeading } from '@components/Workout/styles';

const WORKOUT_NAME = 'workoutName';

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
  display: flex;
  align-items: center;
  gap: 5px;
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
          <WorkoutStarted
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          />
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
