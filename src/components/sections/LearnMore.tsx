import styled from "styled-components";
import { BsPiggyBank, BsGraphUpArrow } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const LearnMoreSection = styled.section`
  padding: 6rem 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }
`;

const LearnMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Noto Serif Georgian", "TBCX", sans-serif;
  font-size: 2.8rem;
  color: #140e0e;
  margin: 0 0 1rem 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0 auto;
  max-width: 600px;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 500px;
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fdf2e9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(229, 126, 34, 0.05) 0%,
      rgba(69, 38, 10, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const StepIconWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e57e22 0%, #cf711f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  box-shadow: 0 8px 24px rgba(229, 126, 34, 0.3);

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #45260a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 2;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
    top: -6px;
    right: -6px;
  }
`;

const StepTitle = styled.h3`
  position: relative;
  z-index: 1;
  font-size: 1.4rem;
  color: #140e0e;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StepDescription = styled.p`
  position: relative;
  z-index: 1;
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export function LearnMore() {
  return (
    <LearnMoreSection id="learn-more-section">
      <LearnMoreContainer>
        <SectionHeader>
          <SectionTitle>სამი ნაბიჯი წარმატებისთვის</SectionTitle>
          <SectionSubtitle>
            მარტივი და სწრაფი პროცესი თქვენი საქველმოქმედო კამპანიის ან
            ბიზნეს-პროექტის დასაწყებად
          </SectionSubtitle>
        </SectionHeader>

        <StepsContainer>
          <StepCard>
            <StepIconWrapper>
              <BsPiggyBank size={36} />
              <StepNumber>1</StepNumber>
            </StepIconWrapper>
            <StepTitle>შექმენით კამპანია</StepTitle>
            <StepDescription>
              დაამატეთ თქვენი პროექტის დეტალები, მიზნები და ისეთი ინფორმაცია,
              რომელიც ხალხს დააინტერესებს და მოუწოდებს მხარდაჭერისკენ.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepIconWrapper>
              <BsHeart size={36} />
              <StepNumber>2</StepNumber>
            </StepIconWrapper>
            <StepTitle>გაავრცელეთ და მოიზიდეთ დონაციები</StepTitle>
            <StepDescription>
              გააზიარეთ თქვენი კამპანია მეგობრებთან, ოჯახთან და სოციალურ
              ქსელებში. რაც მეტი ხალხი ნახავს, მით უფრო წარმატებული იქნება
              პროექტი.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepIconWrapper>
              <BsGraphUpArrow size={36} />
              <StepNumber>3</StepNumber>
            </StepIconWrapper>
            <StepTitle>მიიღეთ დაფინანსება</StepTitle>
            <StepDescription>
              გამოიყენეთ შეგროვებული თანხა თქვენი მიზნების მისაღწევად. ყველა
              გადარიცხვა სწრაფია, უსაფრთხო და სანდოა, კომისია კი მინიმალური.
            </StepDescription>
          </StepCard>
        </StepsContainer>
      </LearnMoreContainer>
    </LearnMoreSection>
  );
}
