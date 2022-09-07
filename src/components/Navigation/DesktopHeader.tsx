import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Routes } from '@types*';
import Nav from './DesktopNav';

const Header = styled.header<{ hideHeader: boolean }>`
  position: sticky;
  top: 0;
  z-index: 9999;
  transform: ${({ hideHeader }) =>
    hideHeader ? 'translateY(-110%)' : 'translateY(0)'};
  transition: transform 0.3s;
`;

type Props = {
  // For styled components to override styles className needs to be passed
  // https://styled-components.com/docs/basics#styling-any-component
  className?: string;
  routes: Routes[];
};

const DesktopHeader: React.FC<Props> = ({ className, routes }) => {
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
    <Header hideHeader={hideHeader} className={className}>
      <Nav routes={routes} />
    </Header>
  );
};

export default DesktopHeader;
