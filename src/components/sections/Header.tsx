import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { styled, css } from "styled-components";
import KvaliLogo from "/logos/full_logo.svg";
import { Searchbar } from "../atomic/Searchbar";
import Button from "../atomic/Button";
import { FiUser } from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const SCROLL_ACTIVATION_THRESHOLD = 650;

const HeaderContainer = styled.header<{
  $isFixed?: boolean;
  $isTransparentPage?: boolean;
}>`
  position: static;
  width: 100%;
  padding: 24px 0px;
  background-color: transparent;
  background-color: #fdf2e9;

  ${(props) =>
    props.$isFixed &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: ${props.$isTransparentPage
        ? "rgba(255, 255, 255, 0.95)"
        : "white"};
      backdrop-filter: ${props.$isTransparentPage ? "blur(10px)" : "none"};    
      box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.05);
      z-index: 1000;

      ${HeaderSearchbar} input {
        background-color: ${props.$isTransparentPage
          ? "rgba(255, 255, 255, 0.8)"
          : "white"};
      }

      .header-user-btn {
        background-color: ${props.$isTransparentPage
          ? "transparent !important"
          : "white !important"};
      }
    `}

  ${(props) =>
    props.$isTransparentPage &&
    css`
      background-color: transparent;

      ${HeaderSearchbar} input {
        background-color: transparent;
      }

      .header-user-btn {
        background-color: transparent !important;
        &:hover {
          background-color: rgba(255, 245, 235, 0.8) !important;
          border-color: #2c1810;
        }
      }
    `}
`;

const HeaderSpacing = styled.div<{ $isFixed?: boolean }>`
  position: static;
  width: 100%;
  height: 96px;
  display: ${(props) => (props.$isFixed ? "block" : "none")};
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
  // add link to homepage
`;

const HeaderSearchbar = styled(Searchbar)``;

const ButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  .header-campaign-btn {
    box-sizing: border-box;
    background-color: #e57e22;
    border: 1px solid transparent;
    padding: 0.675rem 1.15rem;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #cf711f;
    }
  }

  .header-login-btn {
    box-sizing: border-box;
    background-color: #5f340c;
    padding: 0.675rem 1.15rem;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #45260a;
    }
  }

  .header-user-btn {
    box-sizing: border-box;
    background-color: floralwhite;
    color: #140e0e;
    border: 1px solid #140e0e;
    padding: 0.675rem 1.15rem;
    transition: all 0.2s ease;
    &:hover {
      background-color: #fff5eb;
      border-color: #2c1810;
    }
  }
`;

export function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const notHomepage = location.pathname != "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= SCROLL_ACTIVATION_THRESHOLD) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleUserButtonClick = () => {
    if (user) {
      signOut();
    } else {
      navigate("/login");
    }
  };
  const getUsername = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }

    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }

    // email username fallback
    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "ჩემი ანგარიში";
  };

  return (
    <>
      <HeaderSpacing $isFixed={isFixed} />
      <HeaderContainer $isFixed={isFixed} $isTransparentPage={notHomepage}>
        <HeaderNav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <CompanyLogo src={KvaliLogo} alt="Kvali Logo" />
          </Link>
          <HeaderSearchbar value={searchValue} onChange={handleSearchChange} />
          <ButtonsContainer>
            <Button
              className="header-campaign-btn"
              icon={<BsPiggyBank size={18} />}
            >
              კამპანიის დაწყება
            </Button>
            {user ? (
              <Button
                className="header-user-btn"
                onClick={handleUserButtonClick}
                icon={<FiUser size={18} />}
              >
                {getUsername()}
              </Button>
            ) : (
              <Button
                className="header-login-btn"
                onClick={handleUserButtonClick}
                icon={<FiUser size={18} />}
              >
                შესვლა
              </Button>
            )}
          </ButtonsContainer>
        </HeaderNav>
      </HeaderContainer>
    </>
  );
}
