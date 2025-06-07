import styled from "styled-components";
import Piggy404 from "/img/piggy404.webp";
// import { Button } from "../components/atomic/Button";

const NotFoundPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 1px dotted #45260a60;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 2.4rem;
  padding: 2.4rem;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1.5rem;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 1rem;
    padding: 1rem;
    gap: 1rem;
  }
`;

const NotFoundContent = styled.h1`
  font-size: 1.6rem;
  color: #140e0e;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    gap: 0.75rem;
  }
`;

const NotFoundTitle = styled.span`
  font-size: 2.2rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    text-align: left;
  }
`;

const NotFoundText = styled.p`
  padding: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const NotFoundImage = styled.img`
  width: 33%;
  height: auto;

  @media (max-width: 768px) {
    width: 70%;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    width: 80%;
    max-width: 350px;
  }
`;

export default function NotFound() {
  return (
    <>
      <NotFoundPage>
        <NotFoundContainer>
          <NotFoundImage src={Piggy404} alt="404 Not Found" />
          <NotFoundContent>
            <NotFoundTitle>გვერდი ვერ მოიძებნა</NotFoundTitle>
            <NotFoundText>
              ვებგვერდის მისამართი აღარ არსებობს ან ვერ მოიძებნა. <br></br>{" "}
              გთხოვთ, შეამოწმოთ URL მისამართი ან დაბრუნდეთ მთავარ გვერდზე.
            </NotFoundText>
          </NotFoundContent>
        </NotFoundContainer>
      </NotFoundPage>
    </>
  );
}
