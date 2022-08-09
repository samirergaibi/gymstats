import * as React from 'react';
import styled from 'styled-components';
import { FeatherIcon, SetsIcon, RepetitionIcon } from '@icons';
import { Input } from './styles';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const WorkoutExerciseInput: React.FC<Props> = ({
  variant,
  value,
  ...props
}) => {
  let name = '';
  let postfix = '';
  let Icon = null;

  switch (variant) {
    case 'reps':
      name = 'Reps';
      postfix = 'st';
      Icon = () => <RepetitionIcon color="white" />;
      break;
    case 'sets':
      name = 'Sets';
      postfix = 'st';
      Icon = () => <SetsIcon color="white" />;
      break;
    case 'weight':
      name = 'Vikt';
      postfix = 'kg';
      Icon = () => <FeatherIcon color="white" />;
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
      <StyledInput name={variant} type="number" value={value} {...props} />
      <span>{postfix}</span>
    </Wrapper>
  );
};

export default WorkoutExerciseInput;
