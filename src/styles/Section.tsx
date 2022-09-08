import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 30px 10px;
`;

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

export default Section;
