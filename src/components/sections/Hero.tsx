import styled from "styled-components";
import Button from "../atomic/Button";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const HeroSection = styled.section`
  padding: 48px 0 96px 0;
  height: calc(
    100vh - 80px - 48px - 96px
  ); // entire viewport height minus header and padding
  background-color: #fdf2e9;
  border-top: 1px dotted #45260a60;

  @media (max-width: 768px) {
    flex-flow: wrap-reverse;

    #hero-img {
      width: 75%;
    }
  }

  /* @media (max-width: 1920px) {
    #hero-body {
      width: 50%;
      font-size: 1.2rem;
    }
    #hero-img {
      width: 950px;
      height: auto;
    }
  } */
`;

const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HeroBody = styled.div`
  padding: 0 0.25rem 0 4.2rem;
  font-size: 1rem;
  max-width: 730px;
  color: #140e0e;

  h1 {
    font-family: "Noto Serif Georgian", "TBCX", sans-serif;
  }

  p {
    font-size: 1.085rem;
    line-height: 1.6;
    max-width: 600px;
  }

  .hero-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1.75rem;
    gap: 0.75rem;
  }

  .hero-learnmore-btn {
    position: relative;
    overflow: hidden;
    background-color: white;
    box-sizing: border-box;
    padding: 13px 1rem;
    color: #222222;
    font-weight: 500;
    font-size: 1rem;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      border-radius: 6px;
      z-index: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover::before {
      inset: 3px;
      background-color: #fdf2e9;
    }

    span {
      position: relative;
      z-index: 1;
    }
  }

  .hero-viewall-btn {
    padding: 13px 0.75rem;
    background-color: #e57e22;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #cf711f;
    }
  }
`;

const HeroImage = styled.img`
  margin-right: 2rem;
  width: 800px;
  height: 500px;
`;

export function Hero() {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <HeroDiv>
        <HeroBody id="hero-body">
          <h1>დააფინანსე კეთილი საქმე და განავითარე ბიზნესი — აქ</h1>
          <p>
            ერთი სივრცე იდეების რეალობად ქცევისთვის. დაიწყეთ საქველმოქმედო
            კამპანია ან მოიძიეთ დაფინანსება თქვენი ბიზნესისთვის, სწრაფად და
            მარტივად.
          </p>
          <div className="hero-btns">
            {/* TODO: Use Link to navigate instead, reference semantic ui button props */}
            <Button
              onClick={() => navigate("/campaigns")}
              className="hero-viewall-btn"
              icon={<CiViewList size={22} />}
            >
              კამპანიები
            </Button>
            <Button className="hero-learnmore-btn" scrollsTo="cta-section">
              <span>მეტის გაგება ↓</span>
            </Button>
          </div>
        </HeroBody>
        <HeroImage id="hero-img" src="/img/hero-illustration.svg" />
      </HeroDiv>
    </HeroSection>
  );
}
