import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import { TextField } from './Form';
import { supabase } from '@utils/supabaseClient';
import arrowRightSvg from '@assets/arrow-down-circle.svg';

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

const Arrow = styled(Image)<{
  $isOpen: boolean;
}>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
  transition: ${COLLAPSE_TIME_IN_SECONDS}s transform;
`;

const initialValues = {
  categories: '',
  name: '',
  reps: '',
  sets: '',
  weight: '',
};

type FormValues = {
  categories: string;
  name: string;
  reps: string;
  sets: string;
  weight: string;
};

const validationSchema = Yup.object({
  categories: Yup.string().required('Fyll i en kategori'),
  name: Yup.string().required('Fyll i en övning'),
  reps: Yup.string().required('Fyll i antalet repetition'),
  sets: Yup.string().required('Fyll i antalet sets'),
  weight: Yup.string().required('Fyll i vikten'),
});

type Props = {
  setSynchronizeData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExerciseForm: React.FC<Props> = ({ setSynchronizeData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addExercise = async (
    { name, categories, reps, sets, weight }: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const user = supabase.auth.user();
    if (!user?.id) {
      // TODO: handle no user id
      return null;
    }

    const formattedCategories = categories
      .split(',')
      .map((category) => category.toLowerCase().trim())
      .filter(Boolean);

    const { error } = await supabase.from('exercises').insert({
      name: name.toLowerCase(),
      reps,
      sets,
      weight,
      categories: formattedCategories,
      userId: user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    resetForm();
    setSynchronizeData((trigger) => !trigger);
  };

  return (
    <Wrapper>
      <CollapseLine />
      <DynamicCollapsible
        transitionTime={COLLAPSE_TIME_IN_SECONDS * 1000}
        trigger={
          <CollapseButton>
            <p>Lägg till en ny övning</p>
            <Arrow
              alt="Arrow pointing right icon"
              src={arrowRightSvg}
              $isOpen={isOpen}
            />
          </CollapseButton>
        }
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={addExercise}
          validationSchema={validationSchema}
        >
          {({ errors, values, handleChange, handleBlur, touched }) => {
            return (
              <StyledForm>
                <TextField
                  id="categories"
                  label="Kategori/Kategorier"
                  type="text"
                  placeholder="t.ex. Biceps, Bröst"
                  value={values.categories}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.categories}
                  touched={touched.categories}
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
            );
          }}
        </Formik>
      </DynamicCollapsible>
      <CollapseLine />
    </Wrapper>
  );
};

export default ExerciseForm;
