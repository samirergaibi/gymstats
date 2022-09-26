import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Section, H2, Spinner } from '@styles';
import { Paths } from '@constants';
import Hero from '@components/Hero';
import Link from '@components/Link';
import TextField from '@components/Form/TextField';
import Button from '@components/Button';
import WorkoutStarted from './/WorkoutStarted';
import WorkoutTemplates from './WorkoutTemplates';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import { useGetWorkouts } from '@hooks/queries/useGetWorkouts';

const WORKOUT_NAME = 'workoutName';

const NoTemplateText = styled.p`
  font-style: italic;
  font-weight: var(--medium-bold);
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

const TemplateWrapper = styled.div`
  margin-top: 15px;
`;

const InputWrapper = styled.div`
  max-width: 400px;
`;

const NewWorkout = () => {
  const { workoutStorage, setWorkoutName, setWorkoutStorage } =
    useWorkoutContext();
  const workoutStarted = !!workoutStorage?.workoutName;

  const { data: workouts = [], isLoading } = useGetWorkouts();
  const templates = workouts.filter((workout) => workout.isTemplate);
  const showTemplates = !isLoading && templates.length > 0;

  const [workoutNameInput, setWorkoutNameInput] = useState('');
  const [error, setError] = useState('');

  const startWorkout = (event: React.FormEvent) => {
    event.preventDefault();
    const workoutName = workoutNameInput;

    if (!workoutName) {
      setError('Du måste namnge ditt träningspass.');
      return;
    }

    setWorkoutName(workoutName);
    setWorkoutNameInput('');
  };

  useEffect(() => {
    if (workoutNameInput.length > 0) {
      setError('');
    }
  }, [workoutNameInput]);

  return (
    <>
      <Hero imgUrl="/new-workout-hero.jpg" title="Nytt träningspass" />
      <Section>
        <H2>Starta från mall</H2>
        <p>
          Kör du ofta likadana träningspass, eller roterar mellan några olika?
          <Link href={Paths.WORKOUTS} spaceAfter spaceBefore>
            Skapa en mall
          </Link>
          från ett av dina tidigare träningspass för att snabbt kunna starta upp
          det träningspass du kör just idag!
        </p>
        <TemplateWrapper>
          {isLoading && <Spinner size={20} />}
          {showTemplates ? (
            <WorkoutTemplates
              templates={templates}
              setWorkoutStorage={setWorkoutStorage}
            />
          ) : (
            <NoTemplateText>Du har inga mallar!</NoTemplateText>
          )}
        </TemplateWrapper>
      </Section>
      <Section>
        <H2>Starta nytt träningspass</H2>
        <p>
          Ingen mall? Ingen fara, du kan bygga ett träningspass as you go och
          lägga till övningar under träningspasset.
        </p>
        {workoutStarted && (
          <StartedText>Du har påbörjat ett träningspass 👇</StartedText>
        )}
        {!workoutStarted && (
          <StartWorkoutForm onSubmit={(event) => startWorkout(event)}>
            <InputWrapper>
              <label>Namn på träningspass</label>
              <TextField
                name={WORKOUT_NAME}
                type="text"
                placeholder={'t.ex. Underkropp'}
                withBorder
                error={error}
                touched={!!error}
                onChange={(e) => setWorkoutNameInput(e.target.value)}
                value={workoutNameInput}
              />
            </InputWrapper>
            <StyledButton variant="blue" type="submit">
              Starta nytt
            </StyledButton>
          </StartWorkoutForm>
        )}
      </Section>
      {workoutStarted && (
        <Section>
          <WorkoutStarted />
        </Section>
      )}
    </>
  );
};

export default NewWorkout;
