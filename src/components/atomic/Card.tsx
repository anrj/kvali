import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";

const CardContainer = styled.div`
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0.875rem;
  padding-bottom: 1.25rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fdf2e9;

    img {
      transform: scale(1);
    }
  }
`;

const CardBody = styled.div``;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 15 / 10;
  overflow: hidden;
  position: relative;
  border-radius: 14px;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  transform: scale(1.05);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const CardTitle = styled.span`
  font-weight: 500;
  font-size: 1.075rem;
  color: #0a0a0a;
  line-height: 1.4;
  height: 2.8em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoneyRaised = styled.span`
  font-size: 1rem;

  span {
    font-weight: 500;
    font-size: 1.1rem;
    margin-right: 0.1rem;
  }
`;

const CardProgressBar = styled(ProgressBar)`
  margin-top: 0.775rem;
  margin-bottom: 0.125rem;
`;

interface CardProps {
  id: number;
  imageSrc: string;
  title: string;
  barPercentage: number;
  moneyRaised: number;
}

export function Card({
  id,
  imageSrc,
  title,
  barPercentage,
  moneyRaised,
}: CardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/campaign/${id}`);
  };

  return (
    <>
      <CardContainer onClick={handleCardClick}>
        <ImageWrapper>
          <CardImage src={imageSrc}></CardImage>
        </ImageWrapper>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardProgressBar percentage={barPercentage} />
          <MoneyRaised>
            {" "}
            შეგროვდა <span>₾</span>
            {moneyRaised}
          </MoneyRaised>
        </CardBody>
      </CardContainer>
    </>
  );
}
