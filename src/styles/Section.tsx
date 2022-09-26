import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 30px 10px;
  max-width: 1000px;

  @media (min-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children, ...props }) => {
  return <StyledSection {...props}>{children}</StyledSection>;
};

export default Section;
