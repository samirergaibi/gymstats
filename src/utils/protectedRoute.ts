import { GetServerSideProps } from 'next';
import { Paths } from '@constants';
import { supabase } from './supabaseClient';

export const protectedRoute: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: Paths.LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
