import * as React from 'react';
import styled from 'styled-components';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import { useUserContext } from '@contexts/UserContext';
import { DBTable } from '@constants';
import { Workout } from '@types';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';
import WorkoutStarted from '@components/Workout/WorkoutStarted';
import { Section, WorkoutHeading } from '@components/Workout/styles';
import Spinner from '@components/Spinner';
import { useWorkoutContext } from '@contexts/WorkoutContext';

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

const LoadingWrapper = styled.div`
  margin-top: 15px;
`;

const getDefaultName = () =>
  `Inget namn (${dayjs().locale('sv').format('D MMMM YYYY')})`;

const startWorkout = (
  e: React.FormEvent,
  setWorkoutName: (name: string) => void,
) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const workoutName = formData.get(WORKOUT_NAME);
  if (workoutName && typeof workoutName === 'string') {
    setWorkoutName(workoutName);
  } else {
    setWorkoutName(getDefaultName());
  }
};

const NewWorkout = () => {
  const { user } = useUserContext();
  const { workoutStorage, setWorkoutName } = useWorkoutContext();
  const { workoutName } = workoutStorage ?? {};

  const { data: workouts = [], isLoading } = useQuery<Workout[]>(
    ['workouts'],
    async () => {
      const { data, error } = await supabase
        .from(DBTable.WORKOUTS)
        .select()
        .eq('userId', user?.id);

      if (error) {
        throw new Error(error.message);
      }

      const normalizedWorkouts = data.map((workout) => ({
        ...workout,
        exercises: JSON.parse(workout.exercises),
      }));
      return normalizedWorkouts;
    },
  );
  const templates = workouts.filter((workout) => workout.isTemplate);

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
        {isLoading ? (
          <LoadingWrapper>
            <Spinner size={20} />
          </LoadingWrapper>
        ) : templates.length > 0 ? (
          <div>
            {templates.map((template) => (
              <strong key={template.id}>{template.workoutName}</strong>
            ))}
          </div>
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
          <StartWorkoutForm
            onSubmit={(event) => startWorkout(event, setWorkoutName)}
          >
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
