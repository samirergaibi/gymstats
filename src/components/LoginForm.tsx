import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { supabase } from '@utils/supabaseClient';
import { Form, FormInput } from './Form';

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Ogiltig e-postadress')
    .required('Fyll i e-postadress'),
  password: Yup.string().required('Fyll i lösenord'),
});

const LoginForm: React.FC = () => {
  const [apiError, setApiError] = useState<string>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { email = '', password = '' } = watch();

  const login = async ({ email, password }: FormValues) => {
    if (!supabase) {
      throw new Error('Trying to log in without being connected to Supabase.');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setApiError('Ogiltiga inloggningsuppgifter');
    }
  };

  useEffect(() => {
    if (email.length === 0 || password.length === 0) {
      setApiError(undefined);
    }
  }, [email, password]);

  return (
    <Form
      buttonText='Logga in'
      error={apiError}
      title='Logga in på ditt konto'
      onSubmit={handleSubmit(login)}
    >
      <FormInput
        autoComplete='username'
        id='email'
        label='E-postadress'
        type='text'
        placeholder='Ange din e-postadress'
        error={errors.email?.message}
        register={register}
      />
      <FormInput
        autoComplete='current-password'
        id='password'
        label='Lösenord'
        type='password'
        placeholder='Ange ditt lösenord'
        error={errors.password?.message}
        register={register}
      />
    </Form>
  );
};

export default LoginForm;
