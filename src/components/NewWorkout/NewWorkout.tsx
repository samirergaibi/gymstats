import styled from 'styled-components';
import { Section, H2, Spinner } from '@styles';
import { Paths } from '@constants';
import Hero from '@components/Hero';
import Link from '@components/Link';
import WorkoutStarted from './/WorkoutStarted';
import WorkoutTemplates from './WorkoutTemplates';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import { useGetWorkouts } from '@hooks/queries/useGetWorkouts';
import StartWorkoutForm from './StartWorkoutForm';

const NoTemplateText = styled.p`
  font-style: italic;
  font-weight: var(--medium-bold);
`;

const StartedText = styled.p`
  font-style: italic;
  font-weight: var(--medium-bold);
  margin-top: 15px;
`;

const TemplateWrapper = styled.div`
  margin-top: 15px;
`;

const NewWorkout = () => {
  const { workoutStorage, setWorkoutStorage } = useWorkoutContext();
  const workoutStarted = !!workoutStorage?.workoutName;

  const { data: workouts = [], isLoading } = useGetWorkouts();
  const templates = workouts.filter((workout) => workout.isTemplate);
  const showTemplates = !isLoading && templates.length > 0;

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
        {workoutStarted ? (
          <StartedText>Du har påbörjat ett träningspass 👇</StartedText>
        ) : (
          <StartWorkoutForm />
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
