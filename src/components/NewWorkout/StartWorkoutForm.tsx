import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@styles';
import TextField from '@components/Form/TextField';
import { useWorkoutContext } from '@contexts/WorkoutContext';

const WORKOUT_NAME = 'workoutName';

const StyledForm = styled.form`
  margin-top: 15px;
  font-weight: var(--medium-bold);
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputWrapper = styled.div`
  max-width: 400px;
`;

const StartWorkoutForm = () => {
  const [workoutNameInput, setWorkoutNameInput] = useState('');
  const [error, setError] = useState('');

  const { setWorkoutName } = useWorkoutContext();

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
    <StyledForm onSubmit={(event) => startWorkout(event)}>
      <InputWrapper>
        <label>Namn på träningspass</label>
        <TextField
          name={WORKOUT_NAME}
          type='text'
          placeholder={'t.ex. Underkropp'}
          withBorder
          error={error}
          touched={!!error}
          onChange={(e) => setWorkoutNameInput(e.target.value)}
          value={workoutNameInput}
        />
      </InputWrapper>
      <StyledButton variant='blue' type='submit'>
        Starta nytt
      </StyledButton>
    </StyledForm>
  );
};

export default StartWorkoutForm;
