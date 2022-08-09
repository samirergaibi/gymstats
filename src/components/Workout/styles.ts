import styled from 'styled-components';

export const Input = styled.input<{ error: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? 'red' : 'black')};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 0.85rem;
`;

export const Section = styled.section`
  margin: 30px 10px;
`;

export const SectionHeading = styled.h2`
  margin-bottom: 10px;
`;
