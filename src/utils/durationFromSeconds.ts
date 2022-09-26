import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type Options = {
  skipSeconds?: boolean;
};

export const durationFromSeconds = (seconds: number, options?: Options) => {
  const { skipSeconds } = options ?? {};

  const d = dayjs.duration(seconds, 'seconds').days();
  const h = dayjs.duration(seconds, 'seconds').hours();
  const m = dayjs.duration(seconds, 'seconds').minutes();
  const s = dayjs.duration(seconds, 'seconds').seconds();

  // trying to skip seconds with no other time unit results in empty string
  // so just returning the seconds instead.
  if (skipSeconds && seconds < 60) {
    return `${s}sek`;
  }

  const strArr = [];
  if (d > 0) {
    strArr.push(`${d} dagar`);
  }
  if (h > 0) {
    strArr.push(`${h}h`);
  }
  if (m > 0) {
    strArr.push(`${m}min`);
  }
  if (s > 0 && !skipSeconds) {
    strArr.push(`${s}sek`);
  }
  return strArr.join(' ');
};
