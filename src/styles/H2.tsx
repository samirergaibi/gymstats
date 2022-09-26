import styled from 'styled-components';

export const StyledH2 = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

type Props = {
  children: React.ReactNode;
};

const H2: React.FC<Props> = ({ children }) => {
  return <StyledH2>{children}</StyledH2>;
};

export default H2;
