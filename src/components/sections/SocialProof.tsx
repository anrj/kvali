import styled from "styled-components";
import { BsQuote } from "react-icons/bs";

const SocialProofSection = styled.section`
  padding: 2rem 0;
  background-color: #fef9f0;
  border-top: 1px solid rgba(229, 126, 34, 0.1);
  border-bottom: 1px solid rgba(229, 126, 34, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 0;
  }
`;

const SocialProofContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TestimonialCard = styled.div`
  text-align: center;
`;

const QuoteIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #8b4513;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-bottom: 0.75rem;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  color: #333;
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: nowrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #140e0e;
  font-size: 0.9rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const AuthorTitle = styled.span`
  color: #666;
  font-size: 0.85rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Separator = styled.span`
  color: #ccc;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    display: none;
  }
`;

export function SocialProof() {
  return (
    <SocialProofSection>
      <SocialProofContainer>
        <TestimonialsGrid>
          <TestimonialCard>
            <QuoteIcon>
              <BsQuote size={20} />
            </QuoteIcon>
            <TestimonialText>
              "კვალი დამეხმარა ჩემი საქველმოქმედო პროექტის განხორციელებაში.
              მარტივი პლატფორმა და ძალიან მხარდამჭერი გუნდი."
            </TestimonialText>
            <AuthorInfo>
              <AuthorName>ლუკა ხელაშვილი</AuthorName>
              <Separator>•</Separator>
              <AuthorTitle>საქველმოქმედო ორგანიზაციის ხელმძღვანელი</AuthorTitle>
            </AuthorInfo>
          </TestimonialCard>

          <TestimonialCard>
            <QuoteIcon>
              <BsQuote size={20} />
            </QuoteIcon>
            <TestimonialText>
              "სამ კვირაში მივაღწიეთ ჩვენს მიზანს! კვალის დახმარებით ჩვენი
              კაფე-ბიბლიოთეკა რეალობად იქცა."
            </TestimonialText>
            <AuthorInfo>
              <AuthorName>ანა მამულაშვილი</AuthorName>
              <Separator>•</Separator>
              <AuthorTitle>მეწარმე</AuthorTitle>
            </AuthorInfo>
          </TestimonialCard>
        </TestimonialsGrid>
      </SocialProofContainer>
    </SocialProofSection>
  );
}
