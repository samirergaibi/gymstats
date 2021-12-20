import styled from "styled-components";
import Link from "next/link";

const StyledNav = styled.nav`
  padding: 10px;
`;

const StyledLink = styled.a`
  display: inline-block;
  padding: 10px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <Link href="/" passHref>
            <StyledLink>Login</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/exercises" passHref>
            <StyledLink>Exercises</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <StyledLink>About</StyledLink>
          </Link>
        </li>
      </StyledList>
    </StyledNav>
  );
};

export default Nav;
