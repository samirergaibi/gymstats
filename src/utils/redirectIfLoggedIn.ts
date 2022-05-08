import { GetServerSideProps } from 'next';
import { supabase } from './supabaseClient';

export const redirectIfLoggedIn: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
