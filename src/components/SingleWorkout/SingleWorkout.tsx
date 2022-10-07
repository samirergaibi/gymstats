import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Spinner, Section, Hero, Link } from '@styles';
import { Paths } from '@constants';
import { StarIcon, SetsIcon, FeatherIcon, RepetitionIcon } from '@icons';
import { uppercase } from '@utils/uppercase';
import { useGetSingleWorkout } from '@hooks/queries/useGetSingleWorkout';
import Stats from '@components/SingleWorkout/Stats';

const SpinnerWrapper = styled(Section)`
  display: flex;
  justify-content: center;
`;

const TemplateWrapper = styled.div<{ $isTemplate: boolean }>`
  background: ${({ $isTemplate }) =>
    $isTemplate ? 'var(--secondary)' : 'var(--error)'};
  color: #fff;
  border-radius: var(--border-medium);
  padding: 30px 20px;
  font-weight: var(--medium-bold);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.82rem;
  box-shadow: var(--box-shadow-strong);
  max-width: 400px;
`;

const ExerciseWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StyledCard = styled.li`
  background-color: var(--primary);
  color: white;
  padding: 20px;
  border-radius: var(--border-medium);
`;

const UnitsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 15px 0;
`;

const Unit = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SingleWorkout = () => {
  const router = useRouter();
  const id = (router.query.id ?? '') as string;

  const { data: workout, error, isLoading } = useGetSingleWorkout(id);

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if (error) {
    return (
      <Section>
        <p>Något gick fel vid hämtningen av träningspasset.</p>
        <Link href={Paths.WORKOUTS}>Till alla träningspass</Link>
      </Section>
    );
  }

  if (!id || !workout) {
    return (
      <Section>
        <p>Detta träningspass finns inte.</p>;
      </Section>
    );
  }

  const { created_at, exercises, isTemplate, workoutName } = workout;
  const date = dayjs(created_at).locale('sv').format('D MMMM YYYY');

  return (
    <>
      <Hero imgUrl="/equipment.jpg" title={`${uppercase(workoutName)} 💪`} />
      <Section>
        <h2>Vad kan du se här?</h2>
        <p>
          Ta en närmare till på ditt träningspass! Vilka övningar körde du? Vad
          lyfte du på en specifik övning och hur länge tränade du?
        </p>
      </Section>
      <Section>
        <TemplateWrapper $isTemplate={isTemplate}>
          <p>Detta träningspass är {!isTemplate && 'inte'} en aktiv mall</p>
          <div>
            <StarIcon color="var(--yellow)" filled />
          </div>
        </TemplateWrapper>
      </Section>
      <Section>
        <Stats heading={date} workout={workout} />
      </Section>
      <Section>
        <h2>Övningar</h2>
        <p>
          Du körde total {exercises.length} stycken övningar under detta pass!
        </p>
        <ExerciseWrapper>
          {exercises.map((exercise) => (
            <StyledCard key={exercise.id}>
              <h3>{`${uppercase(exercise.name)}`}</h3>
              <UnitsWrapper>
                <Unit>
                  <RepetitionIcon />
                  <p>Reps&nbsp;</p>
                  <p>{exercise.reps} st</p>
                </Unit>
                <div />
                <Unit>
                  <SetsIcon />
                  <p>Sets&nbsp;</p>
                  <p>{exercise.sets} st</p>
                </Unit>
                <Unit>
                  <FeatherIcon />
                  <p>Vikt&nbsp;</p>
                  <p>{exercise.weight} kg</p>
                </Unit>
              </UnitsWrapper>
            </StyledCard>
          ))}
        </ExerciseWrapper>
      </Section>
    </>
  );
};

export default SingleWorkout;
