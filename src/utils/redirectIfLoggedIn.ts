import { GetServerSideProps } from 'next';
import { Paths } from '@constants';
import { supabase } from './supabaseClient';

export const redirectIfLoggedIn: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: Paths.ACCOUNT,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
