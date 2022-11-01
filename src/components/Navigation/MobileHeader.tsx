import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes } from '@types*';
import { Button } from '@styles';
import MobileToggle from './MobileToggle';

const GlobalStyle = createGlobalStyle<{ isOpen: boolean }>`
  body {
    overflow: ${({ isOpen }) => (isOpen ? 'hidden' : 'initial')};
  }
`;

const Header = styled.header`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: end;
  padding: 15px 20px;
  z-index: 100;
  position: relative;
  background-color: var(--dark);
`;

const MenuToggle = styled.button`
  all: unset;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: var(--medium-bold);
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

const ListItem = styled.li`
  display: flex;
  gap: 10px;
`;

const itemStyles = `
color: white;
font-size: 1.5rem;
font-weight: bold;
display: flex;
align-items: center;
gap: 15px;
`;

const StyledLink = styled(Link)<{ $active?: boolean }>`
  ${itemStyles}
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
`;

const StyledButton = styled(Button)<{ $active?: boolean }>`
  ${itemStyles}
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
`;

type Props = {
  // For styled components to override styles className needs to be passed
  // https://styled-components.com/docs/basics#styling-any-component
  className?: string;
  routes: Routes[];
};

const MobileHeader: React.FC<Props> = ({ className, routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <GlobalStyle isOpen={isOpen} />
      <Header className={className}>
        <NavBar>
          <MenuToggle onClick={() => setIsOpen(!isOpen)}>
            <p>{isOpen ? 'Stäng' : 'Öppna'}</p>
            <MobileToggle isOpen={isOpen} />
          </MenuToggle>
        </NavBar>
        <Nav isOpen={isOpen}>
          <StyledList>
            {routes.map(({ action, href, text, icon }) => (
              <ListItem key={href}>
                {action ? (
                  <StyledButton
                    variant='unstyled'
                    onClick={() => {
                      setIsOpen(false);
                      action();
                    }}
                  >
                    {icon && icon}
                    {text}
                  </StyledButton>
                ) : (
                  <StyledLink
                    href={href}
                    $active={router.pathname === href}
                    onClick={() => setIsOpen(false)}
                  >
                    {icon && icon}
                    {text}
                  </StyledLink>
                )}
              </ListItem>
            ))}
          </StyledList>
        </Nav>
      </Header>
    </>
  );
};

export default MobileHeader;
