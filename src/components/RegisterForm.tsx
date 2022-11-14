import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Paths } from '@constants';
import { supabase } from '@utils/supabaseClient';
import { Form, FormInput } from './Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
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
    .required('Du behöver bekräfta lösenordet'),
});

const RegisterForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const [apiError, setApiError] = useState<string>();

  const signUp = async ({ email, password }: FormValues) => {
    if (!supabase) {
      throw new Error('Trying to sign up without being connect to Supabase.');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      // TODO: Sending verification emails is currently disabled since Supabase
      // Does now support re-sending verification emails. Implement this when they do
      // https://github.com/supabase/gotrue/issues/312
      options: { emailRedirectTo: 'https://gymstats.vercel.app/login' },
    });

    if (error) {
      const msg =
        error.message === 'User already registered'
          ? 'Användaren existerar redan'
          : error.message;
      setApiError(msg);
    } else {
      router.push(Paths.LOGIN);
    }
  };

  const handleInputChange = () => {
    if (apiError) {
      setApiError(undefined);
    }
  };

  return (
    <Form
      buttonText='Skapa konto'
      title='Skapa ett konto'
      onSubmit={handleSubmit(signUp)}
      error={apiError}
    >
      <FormInput
        autoComplete='email'
        id='email'
        label='E-postadress'
        type='text'
        placeholder='Ange din e-postadress'
        register={register}
        error={errors.email?.message}
        onChange={handleInputChange}
      />
      <FormInput
        autoComplete='new-password'
        id='password'
        label='Lösenord'
        type='password'
        placeholder='Ange ditt lösenord'
        register={register}
        error={errors.password?.message}
        onChange={handleInputChange}
      />
      <FormInput
        autoComplete='new-password'
        id='passwordConfirmation'
        label='Bekräfta lösenord'
        type='password'
        placeholder='Ange ditt lösenord'
        register={register}
        error={errors.passwordConfirmation?.message}
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default RegisterForm;
