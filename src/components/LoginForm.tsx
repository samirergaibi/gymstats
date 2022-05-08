import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '@utils/supabaseClient';
import { Form, TextField } from './Form';

type FormValues = {
  email: string;
  password: string;
};

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Ogiltig e-postadress')
    .required('Fyll i e-postadress'),
  password: Yup.string().required('Fyll i lösenord'),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>();

  const login = async ({ email, password }: FormValues) => {
    if (!supabase) {
      throw new Error('Trying to log in without being connected to Supabase.');
    }

    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      setApiError('Ogiltiga inloggningsuppgifter');
    }
    if (session && user) {
      // TODO: route to correct login page when it exists
      router.push('/account');
    }
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<FormValues>({
      initialValues,
      validationSchema,
      onSubmit: login,
    });

  useEffect(() => {
    if (values.email.length === 0 || values.password.length === 0) {
      setApiError(undefined);
    }
  }, [values.email, values.password]);

  return (
    <Form
      buttonText="Logga in"
      error={apiError}
      title="Logga in på ditt konto"
      onSubmit={handleSubmit}
    >
      <TextField
        autoComplete="username"
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
        autoComplete="current-password"
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
    </Form>
  );
};

export default LoginForm;
