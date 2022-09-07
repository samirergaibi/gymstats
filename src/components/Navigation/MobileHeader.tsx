import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Routes } from '@types*';

const Header = styled.header`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 20px;
  z-index: 100;
  position: relative;
  background-color: var(--dark);
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  height: 100%;
  width: 100%;
  left: 0;
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  background-color: var(--dark);
  position: fixed;
  z-index: 10;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: bottom 0.3s, opacity 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 20px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const StyledLink = styled.a`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

type Props = {
  // For styled components to override styles className needs to be passed
  // https://styled-components.com/docs/basics#styling-any-component
  className?: string;
  routes: Routes[];
};

const MobileHeader: React.FC<Props> = ({ className, routes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Header className={className}>
      <NavBar>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Stäng' : 'Öppna'}
        </button>
      </NavBar>
      <Nav isOpen={isOpen}>
        <StyledList>
          {routes.map(({ action, href, text }) => (
            <li key={href}>
              <Link href={href} passHref>
                {action ? (
                  <StyledLink
                    onClick={() => {
                      setIsOpen(false);
                      action();
                    }}
                  >
                    {text}
                  </StyledLink>
                ) : (
                  <StyledLink onClick={() => setIsOpen(false)}>
                    {text}
                  </StyledLink>
                )}
              </Link>
            </li>
          ))}
        </StyledList>
      </Nav>
    </Header>
  );
};

export default MobileHeader;
