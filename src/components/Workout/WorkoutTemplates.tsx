import styled from 'styled-components';
import { Workout } from '@types';
import Button from '@components/Button';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 15px;
`;

const StyledButton = styled(Button)<{ moreThanOne: boolean }>`
  padding: 5px 20px;
  border: 1px solid var(--light-gray);
  border-radius: 20px;
  font-size: 0.8rem;
  text-align: center;
  flex-grow: ${({ moreThanOne }) => (moreThanOne ? 1 : 0)};
  @media (min-width: 1000px) {
    flex-grow: 0;
  }
`;

type Props = {
  templates: Workout[];
};

const WorkoutTemplates: React.FC<Props> = ({ templates }) => {
  return (
    <Wrapper>
      {templates.map((template) => (
        <StyledButton moreThanOne={templates.length > 1} variant="unstyled">
          {template.workoutName}
        </StyledButton>
      ))}
    </Wrapper>
  );
};

export default WorkoutTemplates;
