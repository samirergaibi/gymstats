import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Wrapper = styled.div<{
  $gap: number;
  $spaceAbove: boolean;
  $spaceBelow: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
  margin-top: ${({ $spaceAbove }) => ($spaceAbove ? '20px' : 'initial')};
  margin-bottom: ${({ $spaceBelow }) => ($spaceBelow ? '20px' : 'initial')};
`;

const StyledSkeleton = styled.div<{
  $height: number;
}>`
  background: #ebebeb;
  height: ${({ $height }) => $height}px;
  width: 100%;
  border-radius: 4px;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: ' ';
    display: block;
    background-image: linear-gradient(90deg, #ebebeb, #f5f5f5, #ebebeb);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    transform: translateX(-100%);

    animation-name: ${shimmer};
    animation-direction: normal;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
`;

type Props = {
  count?: number;
  gap?: number;
  height?: number;
  spaceAbove?: boolean;
  spaceBelow?: boolean;
};

const Skeleton: React.FC<Props> = ({
  count = 1,
  gap = 10,
  height = 20,
  spaceAbove = false,
  spaceBelow = false,
}) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(<StyledSkeleton $height={height} />);
  }

  return (
    <Wrapper $gap={gap} $spaceAbove={spaceAbove} $spaceBelow={spaceBelow}>
      {skeletons.map((skeleton, i) => (
        <React.Fragment key={i}>{skeleton}</React.Fragment>
      ))}
    </Wrapper>
  );
};

export default Skeleton;
