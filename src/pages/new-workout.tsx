import React, { useState } from 'react';
import styled from 'styled-components';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';

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

const NoWorkoutForm = styled.form`
  margin-top: 10px;
  font-weight: var(--medium-bold);
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
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
          <p>workout has started</p>
        ) : (
          <NoWorkoutForm onSubmit={startWorkout}>
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
          </NoWorkoutForm>
        )}
      </Section>
    </>
  );
};

export default NewWorkout;
