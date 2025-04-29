import { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import KvaliLogo from "../../assets/logos/full_logo.svg";
import { Searchbar } from "../atomic/Searchbar";
import { Button } from "../atomic/Button";
import { FiUser } from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";

const SCROLL_ACTIVATION_THRESHOLD = 650;

const HeaderContainer = styled.header<{ $isFixed: boolean }>`
  position: static;
  width: 100%;
  padding: 24px 0px;
  background-color: transparent;
  background-color: #fdf2e9;

  ${props => props.$isFixed && css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.05);
    z-index: 1000;
  `}
`;

const HeaderSpacing = styled.div<{ $isFixed: boolean }>`
  position: static;
  width: 100%;
  height: 96px;
  display: ${props => props.$isFixed ? "block" : "none"};
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 3.6rem;
  height: 48px;
  gap: 2rem;

  @media (max-width: 705px) {
    padding: 0px 2rem;
    flex-wrap: wrap-reverse;
  }
`;

const CompanyLogo = styled.img`
  height: 36px;
`;

const HeaderSearchbar = styled(Searchbar)<{ $isFixed: boolean }>`
 input {
  ${props => props.$isFixed && css`
    background-color: white;
  `}
 }
`;

const ButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  .header-campaign-btn {
    background-color: #e57e22;
    padding: 0.675rem 1.15rem;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #cf711f;
    }
  }

  .header-login-btn {
    background-color: #5f340c;
    padding: 0.675rem 1.15rem;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #45260a;
    }
  }
`;


export function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
      if (window.scrollY >= SCROLL_ACTIVATION_THRESHOLD) {
        setShowHeader(true);
      }
      else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  const handleSearchChange = (value: string) => {
    setSearchValue(value);

  };

  return (
    <>
    <HeaderSpacing $isFixed={showHeader} />
    <HeaderContainer $isFixed={showHeader}>
      <HeaderNav>
        <CompanyLogo src={KvaliLogo} alt="Kvali Logo" />
        <HeaderSearchbar $isFixed={showHeader} value={searchValue} onChange={handleSearchChange} />
        <ButtonsContainer>
          <Button className="header-campaign-btn" icon={<BsPiggyBank size={18}/>}>კამპანიის დაწყება</Button>
          <Button className="header-login-btn" icon={<FiUser size={18}/>}>შესვლა</Button>  
        </ButtonsContainer>
      </HeaderNav>
    </HeaderContainer>
    </>
  );
}
