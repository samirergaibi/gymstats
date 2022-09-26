import styled from 'styled-components';

const MenuIconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  height: 100%;
  width: 25px;
`;

const MenuIconTopBar = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '23px' : '25px')};
  height: 2px;
  background-color: white;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
  position: relative;
  top: ${({ isOpen }) => (isOpen ? '8px' : '0')};
  transition: transform 0.3s, width 0.3s, top 0.3s;
`;

const MenuIconMiddleBar = styled.div<{ isOpen: boolean }>`
  width: 18px;
  height: 2px;
  background-color: white;

  opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  transition: opacity 0.2s;
`;

const MenuIconBottomBar = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '23px' : '10px')};
  height: 2px;
  background-color: white;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
  position: relative;
  top: ${({ isOpen }) => (isOpen ? '-8px' : '0')};
  transition: transform 0.3s, top 0.3s, width 0.3s;
`;

type Props = {
  isOpen: boolean;
};

const MobileToggle: React.FC<Props> = ({ isOpen }) => {
  return (
    <MenuIconWrapper isOpen={isOpen}>
      <MenuIconTopBar isOpen={isOpen} />
      <MenuIconMiddleBar isOpen={isOpen} />
      <MenuIconBottomBar isOpen={isOpen} />
    </MenuIconWrapper>
  );
};

export default MobileToggle;
