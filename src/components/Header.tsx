import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from './Nav';

const StickyHeader = styled.header<{ hideHeader: boolean }>`
  position: sticky;
  top: 0;
  z-index: 9999;
  transform: ${({ hideHeader }) =>
    hideHeader ? 'translateY(-110%)' : 'translateY(0)'};
  transition: transform 0.3s;
`;

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const startPosition = 300;
    let lastScrollY = window.pageYOffset;

    const scrollListener = () => {
      if (window.pageYOffset > startPosition) {
        setHideHeader(window.pageYOffset > lastScrollY);
        lastScrollY = window.pageYOffset || 0;
      } else {
        setHideHeader(false);
      }
    };

    document.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [hideHeader]);

  return (
    <StickyHeader hideHeader={hideHeader}>
      <Nav />
    </StickyHeader>
  );
};

export default Header;
