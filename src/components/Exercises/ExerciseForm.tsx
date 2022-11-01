import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Form, useFormikContext } from 'formik';
import { Button } from '@styles';
import { ArrowDownCircleIcon } from '@icons';
import { ExerciseFormValues } from '@types';
import { useExerciseContext } from '@contexts/ExerciseContext';
import { TextField } from '@components/Form';

const COLLAPSE_TIME_IN_SECONDS = 0.25;

const Wrapper = styled.div`
  margin: 20px 0;
  @media (min-width: 600px) {
    margin: 60px 0;
  }
`;

const CollapsibleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SizeWrapper = styled.div`
  width: 250px;
  @media (min-width: 600px) {
    width: 450px;
  }
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
  height: 1px;
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

const EditingWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const ExerciseForm = () => {
  const { formIsOpen, setFormIsOpen, editValues, setEditValues } =
    useExerciseContext();
  const {
    values,
    touched,
    handleChange,
    handleBlur,
    errors,
    resetForm,
    setErrors,
  } = useFormikContext<ExerciseFormValues>();

  const abortEdit = () => {
    resetForm();
    setErrors({});
    setEditValues({ isEditing: false });
  };

  return (
    <Wrapper>
      <CollapsibleWrapper>
        <SizeWrapper>
          <CollapseLine />
          <Collapsible
            transitionTime={COLLAPSE_TIME_IN_SECONDS * 1000}
            trigger={
              <CollapseButton>
                <p>
                  {editValues.isEditing
                    ? 'Redigera övningen'
                    : 'Lägg till en ny övning'}
                </p>
                <StyledArrowIcon $isOpen={formIsOpen} size={24} />
              </CollapseButton>
            }
            onOpening={() => setFormIsOpen(true)}
            onClosing={() => setFormIsOpen(false)}
            open={formIsOpen}
          >
            <StyledForm>
              <TextField
                id='muscleGroups'
                label='Muskelgrupp(er)'
                type='text'
                placeholder='t.ex. Biceps, Bröst'
                value={values.muscleGroups}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.muscleGroups}
                touched={touched.muscleGroups}
                withBorder
              />
              <TextField
                id='name'
                label='Övning'
                type='text'
                placeholder='t.ex. Hammer curls'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                withBorder
              />
              <TextField
                id='reps'
                label='Reps'
                type='number'
                placeholder='t.ex. 8'
                value={values.reps}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.reps}
                touched={touched.reps}
                withBorder
              />
              <TextField
                id='sets'
                label='Sets'
                type='number'
                placeholder='t.ex. 4'
                value={values.sets}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.sets}
                touched={touched.sets}
                withBorder
              />
              <TextField
                id='weight'
                label='Vikt (kg)'
                type='number'
                placeholder='t.ex. 20'
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.weight}
                touched={touched.weight}
                withBorder
              />
              {editValues.isEditing ? (
                <EditingWrapper>
                  <StyledButton variant='blue' type='submit'>
                    Spara ändring
                  </StyledButton>
                  <StyledButton variant='red' onClick={abortEdit} type='button'>
                    Avbryt
                  </StyledButton>
                </EditingWrapper>
              ) : (
                <StyledButton variant='blue' type='submit'>
                  Lägg till övning
                </StyledButton>
              )}
            </StyledForm>
          </Collapsible>
          <CollapseLine />
        </SizeWrapper>
      </CollapsibleWrapper>
    </Wrapper>
  );
};

export default ExerciseForm;
