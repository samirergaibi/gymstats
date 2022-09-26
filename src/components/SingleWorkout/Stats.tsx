import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Workout } from '@types';
import StatsList from '@components/StatsList';
import { uppercase } from '@utils/uppercase';
import { durationFromSeconds } from '@utils/durationFromSeconds';

dayjs.locale('sv');
dayjs.extend(duration);
dayjs.extend(relativeTime);

type Props = {
  heading?: string;
  workout: Workout;
};

const Stats: React.FC<Props> = ({ heading, workout }) => {
  const { workoutTime, created_at, workoutName } = workout;

  const diff = dayjs.duration(workoutTime, 'seconds');
  const startTime = dayjs(created_at).subtract(diff).format('HH:mm');
  const endTime = dayjs(created_at).format('HH:mm');

  const data = [
    { text: 'Namn', value: uppercase(workoutName) },
    { text: 'Startades', value: startTime },
    { text: 'Avslutades', value: endTime },
    { text: 'Längd', value: durationFromSeconds(workoutTime) },
  ];

  return (
    <>
      <h2>{heading}</h2>
      <StatsList data={data} />
    </>
  );
};

export default Stats;
