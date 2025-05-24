import { styled, css } from "styled-components";
import eatingImage from "../../assets/img/eating.jpg";
// TO BE REUSED FOR SOMETHING ELSE
// use variables for colors
const CTASection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.8rem 0;
  color: #45260a;
  height: 75vh;
`;

const CTAContainer = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #e98b38;
  border-radius: 0.6rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.17);
  overflow: hidden;
  width: 80%;
  height: 85%;
`;

const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.4rem 3.2rem 2.4rem 3.2rem;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 0;
  box-sizing: border-box;
`;

// put image inside a div, make text content reize along with text too,
// overlay image with the color background-image: linear-gradient( to right bottom, rgba(235, 151, 78, 0.35), rgba(230, 125, 34, 0.35) ), url(../img/eating.jpg);
const CTAImage = styled.div`
  flex-basis: 40%;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
  background-image: linear-gradient(
      to right bottom,
      rgba(235, 151, 78, 0.35),
      rgba(230, 125, 34, 0.35)
    ),
    url(${eatingImage});
  background-size: cover;
  background-position: center;
`;

const CTAHeading = styled.h1`
  font-size: 2.8rem;
  margin: 0 0 1.6rem 0;
  line-height: 1.2;
`;

const CTAParagraph = styled.p`
  font-size: 1.1rem;
  margin: 0;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.6rem;
  row-gap: 0.8rem;
`;

const CTAInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

const InputCSS = css`
  margin: 0;
  padding: 0.6rem 1.6rem;
  padding-left: 0.6rem;
  background-color: #fdf2e9;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  color: #45260a;

  &:focus {
    outline: 4px solid #f3bf92;
  }
`;

const InputField = styled.input`
  ${InputCSS}

  &::placeholder {
    color: #aaaaaa;
  }
`;

const SelectField = styled.select`
  ${InputCSS}
`;

const CTAButton = styled.button`
  ${InputCSS}
  margin-top: 1.4rem;
  padding: 0.6rem 1.6rem;
  background-color: #45260a;
  color: #fdf2e9;
  will-change: background-color, color;
  transition: all 0.2s ease-in-out;
  font-weight: 600;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #fff;
    color: #555555;
  }
`;

export function CTAComponent() {
  return (
    <CTASection id="cta-section">
      <CTAContainer>
        <CTAContent>
          <CTAHeading>Get your first meal for free!</CTAHeading>
          <CTAParagraph>
            Healthy, tasty and hassle-free meals are waiting for you. Start
            eating well <br />
            today. You can cancel or pause anytime. And the first meal is on us!
          </CTAParagraph>
          <CTAForm>
            <CTAInputDiv>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <InputField type="name" placeholder="John Smith" required />
            </CTAInputDiv>
            <CTAInputDiv>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <InputField type="email" placeholder="me@example.com" required />
            </CTAInputDiv>
            <CTAInputDiv>
              <InputLabel htmlFor="select-where">
                Where did you hear from us?
              </InputLabel>
              <SelectField required defaultValue="">
                <option value="" disabled hidden>
                  Please choose one option:
                </option>
                <option value="friend">Friends and family</option>
                <option value="youtube">Youtube video</option>
                <option value="podcast">Podcast</option>
                <option value="facebook">Facebook ad</option>
                <option value="other">Others</option>
              </SelectField>
            </CTAInputDiv>
            <CTAButton type="submit">Sign up now</CTAButton>
          </CTAForm>
        </CTAContent>
        <CTAImage />
      </CTAContainer>
    </CTASection>
  );
}
