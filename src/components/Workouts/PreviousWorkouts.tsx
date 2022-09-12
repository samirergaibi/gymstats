import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import styled from 'styled-components';
import { H2, Section, P } from '@styles';
import { Workout } from '@types';
import { StarIcon } from '@icons';
import TipBox from './TipBox';
import Link from '@components/Link';

const WorkoutList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WorkoutItem = styled.li`
  margin-bottom: 40px;
  margin-top: 40px;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

type Props = {
  workouts?: Workout[];
};

const PreviousWorkouts: React.FC<Props> = ({ workouts }) => {
  return (
    <Section>
      <H2>Tidigare träningspass</H2>
      <P spaceBottom>
        Här kan du se alla de tidigare träningspassen som du har kört! Du kan
        även navigera till respektive träningspass för att se mer information.
      </P>
      <TipBox />
      {workouts && (
        <WorkoutList>
          {workouts.map((workout) => {
            const formattedDate = dayjs(workout.created_at)
              .locale('sv')
              .format('D MMMM YYYY');

            const exerciseNames = workout.exercises
              .slice(0, 3)
              .map((exercise) => exercise.name);
            const workoutBreadText = `Träningspasset innehåller övningar som ${exerciseNames.join(
              ', ',
            )}...`;

            return (
              <WorkoutItem key={workout.id}>
                <TitleWrapper>
                  <StarIcon color="var(--yellow)" filled={workout.isTemplate} />
                  <h3>{formattedDate}</h3>
                </TitleWrapper>
                <ContentWrapper>
                  <strong>{workout.workoutName}</strong>
                  <P>{workoutBreadText}</P>
                </ContentWrapper>
                {/* TODO: add real link to real page */}
                <Link href="/hehe" withIcon>
                  Gå till övning
                </Link>
              </WorkoutItem>
            );
          })}
        </WorkoutList>
      )}
    </Section>
  );
};

export default PreviousWorkouts;
