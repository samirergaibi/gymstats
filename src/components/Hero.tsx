import styled from 'styled-components';

const StyledHero = styled.div<{ imgUrl: string }>`
  height: 100%;
  width: 100%;
  background-image: ${({ imgUrl }) => `url('${imgUrl}')`};
  background-size: cover;
  filter: brightness(65%);
  background-position: center;
`;

const StyledHeroWrapper = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  @media (min-width: 600px) {
    height: 400px;
  }
  @media (min-width: 1200px) {
    height: 500px;
  }
  @media (min-width: 1200px) {
    height: 50vh;
  }
`;

const StyledH1 = styled.h1`
  color: white;
  position: absolute;
  top: 15%;
  left: 0;
  padding-left: 10px;
  font-size: 1.5rem;
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;

type Props = {
  imgUrl: string;
  title: string;
};

const Hero: React.FC<Props> = ({ imgUrl, title }) => {
  return (
    <StyledHeroWrapper>
      <StyledHero imgUrl={imgUrl} />
      {title && <StyledH1>{title}</StyledH1>}
    </StyledHeroWrapper>
  );
};

export default Hero;
