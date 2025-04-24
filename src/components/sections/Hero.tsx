import styled from "styled-components";
import { Button } from "../atomic/Button";
import { CiViewList } from "react-icons/ci";

const HeroSection = styled.section`
  padding: 48px 0 96px 0;
  height: calc(100vh - 80px - 48px - 96px);
  background-color: #fdf2e9;
`;

const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HeroBody = styled.div`
  padding: 0 0.25rem 0 2.5rem;
  margin-left: 2rem;
  font-size: 1rem;
  color: #140e0e;

  h1 {
    font-family: 'Noto Serif Georgian', 'TBCX', sans-serif;
  }

  p {
    font-size: 1.05rem;
  }

  .hero-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1.75rem;
    gap: 0.75rem;
  }

  .hero-learnmore-btn {
    background-color: white;
    border: 4px solid white;
    color: #222222;
    font-weight: 500;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out;
    

    &:hover {
      background-color: #fdf2e9;
    }
  }

  .hero-viewall-btn {
    border: 4px solid #e67e22;
    background-color: #e67e22;
    &:hover {
      background-color: #ff8c26;
    }
  }
`;

const HeroImage = styled.img`
  margin-right: 2rem;
`;

export function Hero() {
  return (
    <HeroSection>
      <HeroDiv>
        <HeroBody>
          <h1>დააფინანსე კეთილი საქმე და განავითარე ბიზნესი — აქ</h1>
          <p>ერთი სივრცე იდეების რეალობად ქცევისთვის. დაიწყეთ საქველმოქმედო კამპანია ან მოიძიეთ დაფინანსება თქვენი ბიზნესისთვის, სწრაფად და მარტივად.</p>
          <div className="hero-btns">
            <Button className="hero-viewall-btn" icon={<CiViewList size={22}/>}>კამპანიების ნახვა</Button>
            <Button className="hero-learnmore-btn">მეტის გაგება ↓</Button>
          </div>
        </HeroBody>
        <HeroImage src="/assets/img/hero-illustration.svg" width={800} height={500}/>
      </HeroDiv>
    </HeroSection>
  );
}