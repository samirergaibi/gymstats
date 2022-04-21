import styled from 'styled-components';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import { supabase } from '../utils/supabaseClient';
import { TextField } from '../components/Form';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  gap 10px;
`;

const StyledH2 = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
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
    <Formik
      initialValues={initialValues}
      onSubmit={addExercise}
      validationSchema={validationSchema}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => {
        return (
          <StyledForm>
            <StyledH2>Lägg till en ny övning</StyledH2>
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
  );
};

export default ExerciseForm;
