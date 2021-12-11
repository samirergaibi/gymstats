import styled from "styled-components";
import Link from "next/link";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;

const Nav: React.FC = () => {
  return (
    <nav>
      <StyledList>
        <li>
          <Link href="/">Login</Link>
        </li>
        <li>
          <Link href="/exercises">Exercises</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </StyledList>
    </nav>
  );
};

export default Nav;
