import Link from 'next/link';
import styled from 'styled-components';

const Card = styled.div<{ backgroundColor: string }>`
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: ${({ backgroundColor }) => backgroundColor};
  color: white;
  border-radius: 12px;
  box-shadow: var(--box-shadow-primary);
`;

const StyledCardText = styled.p`
  margin-bottom: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

type Props = {
  backgroundColor: string;
  href: string;
  imageNode: React.ReactNode;
  text: string;
};

const SmallCard: React.FC<Props> = ({
  backgroundColor,
  href,
  imageNode: ImageNode,
  text
}) => (
  <Link href={href} passHref>
    <StyledLink>
      <Card backgroundColor={backgroundColor}>
        <StyledCardText>{text}</StyledCardText>
        {ImageNode}
      </Card>
    </StyledLink>
  </Link>
);

export default SmallCard;
