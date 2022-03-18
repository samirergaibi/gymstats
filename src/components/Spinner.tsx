import styled, { keyframes } from 'styled-components';

const main = keyframes`100% { transform: rotate(360deg); } `;
const dot = keyframes`80%, 100% { transform: rotate(360deg); } `;
const before = keyframes`50% { transform: scale(0.4); } 100%, 0% { transform: scale(1.0); }`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${dot} 2s infinite ease-in-out both;
  &::before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: var(--dark);
    border-radius: 100%;
    animation: ${before} 2s infinite ease-in-out both;
  }
  &:nth-of-type(1) {
    animation-delay: -1.1s;
  }
  &:nth-of-type(2) {
    animation-delay: -1s;
  }
  &:nth-of-type(3) {
    animation-delay: -0.9s;
  }
  &:nth-of-type(4) {
    animation-delay: -0.8s;
  }
  &:nth-of-type(5) {
    animation-delay: -0.7s;
  }
  &:nth-of-type(6) {
    animation-delay: -0.6s;
  }
  &:nth-of-type(1)::before {
    animation-delay: -1.1s;
  }
  &:nth-of-type(2)::before {
    animation-delay: -1s;
  }
  &:nth-of-type(3)::before {
    animation-delay: -0.9s;
  }
  &:nth-of-type(4)::before {
    animation-delay: -0.8s;
  }
  &:nth-of-type(5)::before {
    animation-delay: -0.7s;
  }
  &:nth-of-type(6)::before {
    animation-delay: -0.6s;
  }
`;

const StyledWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  animation: ${main} 2.5s infinite linear both;
`;

const Spinner: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
    </StyledWrapper>
  );
};

export default Spinner;
