import styled from 'styled-components';
import { StarIcon } from '@icons';

const InfoBox = styled.div`
  background-color: var(--primary);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow-strong);
`;

const TipTitle = styled.p`
  font-weight: var(--medium-bold);
  text-decoration: underline;
`;

const TipText = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
`;

const IconText = styled.p`
  font-weight: var(--medium-bold);
`;

const TipBox = () => {
  return (
    <InfoBox>
      <TipTitle>Tips</TipTitle>
      <TipText>
        Vill du skapa en mall av ett tidigare träningspass? Klicka då på
        stjärnan!
      </TipText>
      <IconsWrapper>
        <IconContainer>
          <IconText>Mall</IconText>
          <StarIcon color='var(--yellow)' filled />
        </IconContainer>
        <IconContainer>
          <IconText>Inte mall</IconText>
          <StarIcon color='var(--yellow)' />
        </IconContainer>
      </IconsWrapper>
    </InfoBox>
  );
};

export default TipBox;
