import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@styles';
import { useWorkoutContext } from '@contexts/WorkoutContext';
import { FormError } from '@components/Form';

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

const Input = styled.input<{ error: boolean }>`
  border-radius: 6px;
  border: ${({ error }) =>
    error ? '2px solid var(--error)' : '2px solid var(--dark)'};
  padding: 8px 10px;
  margin-bottom: 5px;
  font-size: 1rem;
  width: 100%;
  &::placeholder {
    font-size: 0.8rem;
  }
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
        <Input
          name={WORKOUT_NAME}
          type='text'
          placeholder={'t.ex. Underkropp'}
          error={!!error}
          onChange={(e) => setWorkoutNameInput(e.target.value)}
          value={workoutNameInput}
        />
        {error && <FormError>{error}</FormError>}
      </InputWrapper>
      <StyledButton variant='blue' type='submit'>
        Starta nytt
      </StyledButton>
    </StyledForm>
  );
};

export default StartWorkoutForm;
