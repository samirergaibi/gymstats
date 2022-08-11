import { useState, useEffect } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState<string>();

  useEffect(() => {
    const startTime = Date.now() / 1000;
    const timer = setInterval(() => {
      if (startTime) {
        const now = Date.now() / 1000;
        const seconds = Math.round(now - startTime);
        const secondsToDisplay = seconds % 60;

        const minutes = Math.floor(seconds / 60);
        const minutesToDisplay = minutes % 60;

        const hours = Math.floor(minutes / 60);
        const hoursToDisplay = hours % 60;

        let displayString = '';
        if (seconds >= 3600) {
          displayString += `${hoursToDisplay} tim `;
        }
        if (seconds >= 60) {
          displayString += `${minutesToDisplay} min `;
        }
        displayString += `${secondsToDisplay} sek`;
        setTimer(displayString);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!timer) return null;

  return <strong>⏱️ {timer}</strong>;
};

export default Timer;
