import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../utils/supabaseClient';
import { Form, TextField } from './Form';

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Ogiltig e-postadress')
    .required('Du behöver ange din e-postadress'),
  password: Yup.string()
    .min(6, 'Lösenordet måste vara minst 6 tecken långt')
    .required('Du behöver ange ditt lösenord'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Lösenorden stämmer inte överens')
    .required('Du behöver bekräfta lösenordet')
});

const RegisterForm = () => {
  const register = async ({ email, password }: FormValues) => {
    if (!supabase) {
      throw new Error('Trying to sign up without being connect to Supabase.');
    }

    const { user, session, error } = await supabase.auth.signUp(
      { email, password },
      // TODO: Redirect to correct page
      { redirectTo: 'https://samirergaibi.se' }
    );
    console.log({
      user,
      session,
      error
    });
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: register
    });

  return (
    <Form
      buttonText="Skapa konto"
      title="Skapa ett konto"
      onSubmit={handleSubmit}
    >
      <TextField
        autoComplete="email"
        id="email"
        label="E-postadress"
        type="text"
        placeholder="Ange din e-postadress"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <TextField
        autoComplete="new-password"
        id="password"
        label="Lösenord"
        type="password"
        placeholder="Ange ditt lösenord"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />
      <TextField
        autoComplete="new-password"
        id="passwordConfirmation"
        label="Bekräfta lösenord"
        type="password"
        placeholder="Ange ditt lösenord"
        value={values.passwordConfirmation}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.passwordConfirmation}
        touched={touched.passwordConfirmation}
      />
    </Form>
  );
};

export default RegisterForm;
