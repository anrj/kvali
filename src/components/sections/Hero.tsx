import styled from "styled-components";
import Button from "../atomic/Button";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const HeroSection = styled.section`
  padding: 48px 0 96px 0;
  background-color: #fdf2e9;
  border-top: 1px dotted #45260a60;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 24px 0 48px 0;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    min-height: auto;
    padding: 24px 0;
  }
`;

const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    padding: 0 1rem;
  }
`;

const HeroBody = styled.div`
  padding: 0;
  margin-right: 3rem;
  font-size: 1rem;
  max-width: 550px;
  color: #140e0e;
  flex: 1 1 45%;
  min-width: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    padding: 0 1rem;
    max-width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    padding: 0 1rem 0 0;
    text-align: left;
    max-width: 50%;
    margin-right: 1.5rem;
  }

  h1 {
    font-family: "Noto Serif Georgian", "TBCX", sans-serif;
    font-size: 3.2rem;
    margin: 0 0 1.6rem 0;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 1.9rem !important;
      text-align: justify;
    }
    @media (max-width: 480px) {
      font-size: 2rem;
    }
    @media (max-width: 768px) and (orientation: landscape) {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
  }

  p {
    font-size: 1.085rem;
    line-height: 1.6;
    max-width: 600px;
    @media (max-width: 768px) {
      font-size: 0.9rem;
      max-width: 100%;
      text-align: start;
    }
    @media (max-width: 768px) and (orientation: landscape) {
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }

  .hero-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1.75rem;
    gap: 0.75rem;

    @media (max-width: 768px) {
      justify-content: center;
      gap: 1rem;
    }
    @media (max-width: 768px) and (orientation: landscape) {
      flex-direction: row;
      justify-content: flex-start;
      gap: 0.5rem;
      margin-top: 1rem;
    }
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
  width: auto;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  flex: 1 1 55%;
  min-width: 0;

  @media (max-width: 960px) {
  }

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin-right: 0;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-width: 350px;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    width: auto;
    height: clamp(150px, 40vh, 250px);
    max-width: 45%;
    margin-right: 0;
    margin-bottom: 0;
  }
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
            <Button
              onClick={() => navigate("/campaigns")}
              className="hero-viewall-btn"
              icon={<CiViewList size={22} />}
            >
              კამპანიები
            </Button>
            <Button
              className="hero-learnmore-btn"
              scrollsTo="learn-more-section"
            >
              <span>მეტის გაგება ↓</span>
            </Button>
          </div>
        </HeroBody>
        <HeroImage id="hero-img" src="/img/hero-illustration.webp" />
      </HeroDiv>
    </HeroSection>
  );
}
