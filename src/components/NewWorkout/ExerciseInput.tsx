import * as React from 'react';
import styled from 'styled-components';
import { FeatherIcon, SetsIcon, RepetitionIcon } from '@icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Input = styled.input<{ error: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? 'red' : 'black')};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 0.85rem;
`;

const StyledInput = styled(Input)`
  width: 100px;
`;

const ExerciseName = styled.span`
  width: 50px;
`;

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  variant: 'reps' | 'sets' | 'weight';
  value: string;
  error: boolean;
};

const ExerciseInput: React.FC<Props> = ({ variant, value, ...props }) => {
  let name = '';
  let postfix = '';
  let Icon = null;

  switch (variant) {
    case 'reps':
      name = 'Reps';
      postfix = 'st';
      Icon = function Icon() {
        return <RepetitionIcon color='white' />;
      };
      break;
    case 'sets':
      name = 'Sets';
      postfix = 'st';
      Icon = function Icon() {
        return <SetsIcon color='white' />;
      };
      break;
    case 'weight':
      name = 'Vikt';
      postfix = 'kg';
      Icon = function Icon() {
        return <FeatherIcon color='white' />;
      };
      break;
    default:
      throw new Error(
        'Could not find correct icon in ExerciseInput switch case',
      );
  }

  return (
    <Wrapper>
      <Icon />
      <ExerciseName>{name}</ExerciseName>
      <StyledInput name={variant} type='number' value={value} {...props} />
      <span>{postfix}</span>
    </Wrapper>
  );
};

export default ExerciseInput;
