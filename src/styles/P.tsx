import styled from 'styled-components';

const StyledP = styled.p<{ spaceBottom?: boolean; spaceTop?: boolean }>`
  margin-bottom: ${({ spaceBottom }) => (spaceBottom ? '15px' : 'initial')};
  margin-top: ${({ spaceTop }) => (spaceTop ? '15px' : 'initial')};
`;

type Props = {
  children: React.ReactNode;
  spaceBottom?: boolean;
  spaceTop?: boolean;
};

const P: React.FC<Props> = ({ children, spaceBottom, spaceTop }) => {
  return (
    <StyledP spaceBottom={spaceBottom} spaceTop={spaceTop}>
      {children}
    </StyledP>
  );
};

export default P;
