import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Form, useFormikContext } from 'formik';
import { ArrowDownCircleIcon } from '@icons';
import { ExerciseFormValues } from '@types';
import { useExerciseContext } from '@contexts/ExerciseContext';
import Button from './Button';
import { TextField } from './Form';

const COLLAPSE_TIME_IN_SECONDS = 0.25;

const DynamicCollapsible = dynamic(() => import('react-collapsible'), {
  ssr: false,
});

const Wrapper = styled.div`
  margin: 20px 0;
`;

const CollapseButton = styled.button`
  all: unset;
  font-weight: var(--medium-bold);
  display: block;
  margin: 0 auto;
  display: flex;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
`;

const CollapseLine = styled.div`
  width: 250px;
  height: 1px;
  margin: 0 auto;
  background-color: var(--light-gray);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  gap 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const StyledArrowIcon = styled(ArrowDownCircleIcon)<{
  $isOpen: boolean;
}>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
  transition: ${COLLAPSE_TIME_IN_SECONDS}s transform;
`;

const ExerciseForm = () => {
  const { formIsOpen, setFormIsOpen } = useExerciseContext();
  const { values, touched, handleChange, handleBlur, errors } =
    useFormikContext<ExerciseFormValues>();

  return (
    <Wrapper>
      <CollapseLine />
      <DynamicCollapsible
        transitionTime={COLLAPSE_TIME_IN_SECONDS * 1000}
        trigger={
          <CollapseButton>
            <p>Lägg till en ny övning</p>
            <StyledArrowIcon $isOpen={formIsOpen} />
          </CollapseButton>
        }
        onOpening={() => setFormIsOpen(true)}
        onClosing={() => setFormIsOpen(false)}
        open={formIsOpen}
      >
        <StyledForm>
          <TextField
            id="muscleGroups"
            label="Muskelgrupp(er)"
            type="text"
            placeholder="t.ex. Biceps, Bröst"
            value={values.muscleGroups}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.muscleGroups}
            touched={touched.muscleGroups}
            withBorder
          />
          <TextField
            id="name"
            label="Övning"
            type="text"
            placeholder="t.ex. Hammer curls"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            withBorder
          />
          <TextField
            id="reps"
            label="Reps"
            type="number"
            placeholder="t.ex. 8"
            value={values.reps}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.reps}
            touched={touched.reps}
            withBorder
          />
          <TextField
            id="sets"
            label="Sets"
            type="number"
            placeholder="t.ex. 4"
            value={values.sets}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.sets}
            touched={touched.sets}
            withBorder
          />
          <TextField
            id="weight"
            label="Vikt (kg)"
            type="number"
            placeholder="t.ex. 20"
            value={values.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.weight}
            touched={touched.weight}
            withBorder
          />
          <StyledButton variant="blue" type="submit">
            Lägg till övning
          </StyledButton>
        </StyledForm>
      </DynamicCollapsible>
      <CollapseLine />
    </Wrapper>
  );
};

export default ExerciseForm;
