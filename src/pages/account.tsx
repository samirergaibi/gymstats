import { NextPage } from 'next';
import { protectedRoute } from '../utils/protectedRoute';

const AccountPage: NextPage = () => {
  return (
    <div>
      <h1>Ditt Konto! 😜</h1>
    </div>
  );
};

export default AccountPage;

export const getServerSideProps = protectedRoute;
