import styled from "styled-components";
import { NextPage } from "next";
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

const Nav: NextPage = () => {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <Link href="/" passHref>
            <StyledLink>Hem</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <StyledLink>Om GymStats</StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <StyledLink>Logga in</StyledLink>
          </Link>
        </li>
      </StyledList>
    </StyledNav>
  );
};

export default Nav;
