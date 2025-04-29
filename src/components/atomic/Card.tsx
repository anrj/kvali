import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";
// for dev view only
const TemporaryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
`;

const CardContainer = styled.div`
  background-color: #fdf2e9;

  width: 30%;
  box-sizing: border-box;

  padding: 0.875rem;
  border-radius: 5px;
  

  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const CardBody = styled.div`
  gap: 0.275rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 14px;
  aspect-ratio: 15 / 10; 
`;

const CardTitle = styled.span`
  font-weight: 500;
  font-size: 1.225rem;
  color: #0a0a0a;
`;

const MoneyRaised = styled.span`
  font-size: 1rem;

  span {
    font-weight: 500;
    font-size: 1.1rem;
    margin-right: 0.1rem;
  }
`;

interface CardProps {
  imageSrc: string,
  title: string,
  barPercentage: number,
  moneyRaised: number;
}

export function Card({ imageSrc, title, barPercentage, moneyRaised }: CardProps) { 
  return (
    <>
      <TemporaryDiv>
        <CardContainer>
          <CardImage src={imageSrc}></CardImage>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <div style={{ marginTop: "0.775rem", marginBottom: "0.125rem" }}>
              <ProgressBar percentage={barPercentage} />
            </div>
            <MoneyRaised> შეგროვდა <span>₾</span>{moneyRaised}</MoneyRaised>
          </CardBody>
        </CardContainer>
      </TemporaryDiv>
    </>
  );
}