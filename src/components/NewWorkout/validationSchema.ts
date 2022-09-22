import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Fyll i namn'),
  reps: Yup.number().required('Fyll i reps'),
  sets: Yup.number().required('Fyll i sets'),
  weight: Yup.number().required('Fyll i vikt'),
});
