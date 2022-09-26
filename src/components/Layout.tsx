import styled from 'styled-components';
import Header from '@components/Navigation/Header';

const StyledMain = styled.main`
  @media (max-width: 1000px) {
    margin-bottom: 20%;
  }
`;

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Layout;
