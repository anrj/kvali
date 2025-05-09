import styled from "styled-components";
import  Piggy404  from "/assets/img/piggy404.svg";
// import { Button } from "../components/atomic/Button";

const NotFoundPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 1px dotted #45260a60;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 2.4rem;
  padding: 6.8rem 2.4rem 6.8rem 2.4rem;

`;

const NotFoundContent = styled.h1`
  font-size: 1.6rem;
  color: #140e0e;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const NotFoundTitle = styled.span`
  font-size: 2.8em;
`;

const NotFoundText = styled.p`
  padding: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4;
`;

const NotFoundImage = styled.img`
  width: 33%;
  height: auto;
`;

export default function NotFound() {
  return (
    <>
    <NotFoundPage>
      <NotFoundContainer>
        <NotFoundImage src={Piggy404} alt="404 Not Found" />
        <NotFoundContent>
          <NotFoundTitle>გვერდი ვერ მოიძებნა</NotFoundTitle>
          <NotFoundText>ვებგვერდის მისამართი აღარ არსებობს ან ვერ მოიძებნა. <br></br> გთხოვთ, შეამოწმოთ URL მისამართი ან დაბრუნდეთ მთავარ გვერდზე.</NotFoundText>
        </NotFoundContent>
      </NotFoundContainer>
    </NotFoundPage>
    </>
  );
}