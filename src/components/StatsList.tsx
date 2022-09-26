import styled from 'styled-components';
import { Stat } from '@types';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.div`
  font-weight: var(--medium-bold);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const StyledHr = styled.hr`
  margin-top: 15px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid var(--light-gray);
`;

const FirstItem = styled.p`
  justify-self: start;
`;

const SecondItem = styled.p`
  justify-self: center;
`;

const ThirdItem = styled.p`
  justify-self: end;
  text-align: right;
`;

type Props = {
  data: Stat[];
};

const StatsList: React.FC<Props> = ({ data }) => {
  return (
    <List>
      {data.map(({ text, value }, i) => (
        <li key={`${text}-${value}`}>
          <ListItem>
            <FirstItem>{text}</FirstItem>
            <SecondItem>👉</SecondItem>
            <ThirdItem>{value}</ThirdItem>
          </ListItem>
          {i !== data.length - 1 && <StyledHr />}
        </li>
      ))}
    </List>
  );
};

export default StatsList;
