import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { Paths } from '@constants';
import { DumbellIcon, UserIcon } from '@icons';
import pilatesSvg from '@assets/pilates.svg';
import SmallCard from '@components/SmallCard';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 30px;
  padding: 40px 20px;
  width: 95%;
  margin: 0 auto;
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
  @media screen and (min-width: 1500px) {
    width: 40%;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Home: NextPage = () => {
  return (
    <>
      <ImageWrapper>
        <Image alt="Illustration of a woman doing pilates" src={pilatesSvg} />
      </ImageWrapper>
      <ContentWrapper>
        <p>
          Välkommen till GymStats! Stället där du kan dokumentera och hålla reda
          på dina framsteg för din träning. Här på GymStats får du enkelt en
          överblick över ditt personliga träningsprogram som du själv utformar
          och som du självklart kan ändra och modifiera, precis när du vill och
          hur du vill.
        </p>
        <CardWrapper>
          <SmallCard
            backgroundColor="var(--secondary)"
            href={Paths.LOGIN}
            imageNode={<UserIcon />}
            text="Logga in"
          />
          <SmallCard
            backgroundColor="var(--primary)"
            href={Paths.REGISTER}
            imageNode={<DumbellIcon />}
            text="Skapa konto"
          />
        </CardWrapper>
      </ContentWrapper>
    </>
  );
};

export default Home;
