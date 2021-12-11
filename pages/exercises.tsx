import { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  align-items: center;
  justify-items: center;
`;

const StyledExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  gap: 5px;
`;

const StyledImageContainer = styled.div`
  width: 200px;
  height: 150px;
  align-self: center;
`;

const StyledExcerpt = styled.p`
  padding: 0 15px;
`;

const Exercises: NextPage = () => {
  return (
    <div>
      <h1>Exercises!</h1>
      <StyledList>
        <li>
          <StyledExerciseCard>
            <h2>Plank</h2>
            <StyledImageContainer>
              <Image
                quality={100}
                alt="woman doing the plank exercise"
                src="https://images.unsplash.com/photo-1626444231642-6bd985bca16a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                loading="eager"
                height={150}
                width={200}
              />
            </StyledImageContainer>
            <StyledExcerpt>
              Read more about the Plank to understand how to execute the
              excersise properly!
            </StyledExcerpt>
          </StyledExerciseCard>
        </li>
      </StyledList>
    </div>
  );
};

export default Exercises;
