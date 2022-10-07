import { NextPage } from 'next';
import styled from 'styled-components';
import { H2, Section, Hero, Link } from 'styles';
import { Paths } from '@constants';

const StyledP = styled.p`
  margin-top: 10px;
`;

const StyledOl = styled.ol`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const About: NextPage = () => {
  return (
    <>
      <Hero imgUrl="/about.jpg" />
      <Section>
        <h1>💪 Om Gymstats!</h1>
        <StyledP>
          Tränar du varje vecka? lite då och då? Hur som helst så är det enkelt
          hänt att man inte kommer ihåg hur mycket man lyfte på just den där
          övningen förra veckan... Eller så kanske man bara vill ha ett centralt
          ställe där ens tidigare träningspass lever och bor, där man lätt kan
          se lite enkel statistik. Hur många gympass har jag kört i år? Hur
          länge tränar jag i snitt? Dessa frågor och mer kan du enkelt få reda
          på om du använder Gymstats!
        </StyledP>
      </Section>
      <Section>
        <H2>🏃‍♂️ Så hur kommer jag igång?</H2>
        <StyledP>Det är super enkelt, gör såhär!</StyledP>
        <StyledOl>
          <li>
            <StyledP>
              <Link href={Paths.REGISTER}>Skapa ett konto</Link>
              <span> och logga in</span>
            </StyledP>
          </li>
          <li>
            <StyledP>
              När du sen är på gymmet så startar du ett nytt träningspass
            </StyledP>
          </li>
          <li>
            <StyledP>
              Under träningspassets gång så lägger du till övningarna du kör och
              sparar
            </StyledP>
          </li>
        </StyledOl>
        <StyledP>
          Det är inte svårare än så! Sedan kan du, sålänge du är inloggad på
          ditt konto se alla dina tidigare träningspass och statisktik för hur
          din träning ser ut i överlag. Är du lite mer nyfiken på ett specifikt
          träningspass så kan du även gå in på det och se vilka övningar du
          körde, hur länge träningspasset höll på och lite annat smått och gott.
        </StyledP>
      </Section>
      <Section>
        <H2>🥕 En morot för ett hälsosammare liv</H2>
        <StyledP>
          Vi hoppas att denna applikation ska underlätta din träning och även
          förhoppningsvis existera som en lite morot. Bli taggad när du ser att
          du faktiskt lyckades nå ditt mål på att gå till gymmet fyra gånger den
          här veckan! Lyfte du 80kg bänk? Fan vad grymt, då kör vi 82.5kg nästa
          vecka!
        </StyledP>
      </Section>
    </>
  );
};

export default About;
