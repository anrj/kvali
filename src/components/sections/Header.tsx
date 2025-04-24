import { useState } from "react";
import styled from "styled-components";
import KvaliLogo from "../../assets/logos/full_logo.svg";
import { Searchbar } from "../atomic/Searchbar";
import { Button } from "../atomic/Button";
import { FiUser } from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";


const HeaderContainer = styled.header`
  position: sticky;
  padding: 24px 0px;
  background-color: transparent;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
  background-color: #fdf2e9;

  border-bottom: 1px dotted #45260a60;
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

const ButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  .header-campaign-btn {
    background-color: #e67e22;
    border: 3px solid #e67e22;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #ff8c26;
    }
  }

  .header-login-btn {
    border: 3px solid #45260a;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #5f340c;
    }
  }
`;


export function Header() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

  };

  return (
    <HeaderContainer>
      <HeaderNav>
        <CompanyLogo src={KvaliLogo} alt="Kvali Logo" />
        <Searchbar value={searchValue} onChange={handleSearchChange} />
        <ButtonsContainer>
          <Button className="header-campaign-btn" icon={<BsPiggyBank size={18}/>}>კამპანიის დაწყება</Button>
          <Button className="header-login-btn" icon={<FiUser size={18}/>}>შესვლა</Button>  
        </ButtonsContainer>
      </HeaderNav>
    </HeaderContainer>
  );
}
