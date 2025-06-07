import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { styled, css } from "styled-components";
import KvaliLogo from "/logos/full_logo.svg";
import { Searchbar } from "../atomic/Searchbar";
import Button from "../atomic/Button";
import { FiUser, FiLogOut, FiUser as FiProfile, FiClock } from "react-icons/fi";
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
      background-color: #ffffffbb;

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

  @media (max-width: 768px) {
    padding: 16px 0px;
  }
`;

const HeaderSpacing = styled.div<{ $actualHeaderHeight: number }>`
  width: 100%;
  height: ${(props) => props.$actualHeaderHeight}px;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 3.6rem;
  height: 48px;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0px 1rem;
    gap: 0.75rem;
    height: auto;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center; // Explicitly align items to center for vertical alignment
  }
`;

const CompanyLogo = styled.img`
  height: 36px;
  flex-shrink: 0;
  display: block; // Visible by default

  @media (max-width: 768px) {
    height: 30px;
  }

  @media (max-width: 480px) {
    display: none; // Hide full logo on small screens
  }
`;

const CompanyHandLogo = styled.img`
  display: none; // Hidden by default
  height: 32px; // Consistent with the smallest size of the full logo
  flex-shrink: 0;

  @media (max-width: 480px) {
    display: block; // Show hand logo on small screens
    height: 36px;
  }
`;

const HeaderSearchbar = styled(Searchbar)`
  flex-grow: 1;
  max-width: 400px;
  min-width: 150px;

  @media (max-width: 768px) {
    order: 2;
    min-width: 120px;
    max-width: 250px;
    & input {
      font-size: 0.85rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    min-width: 100px;
    max-width: 180px;
    & input {
      font-size: 0.8rem;
    }
  }
`;

const ButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-shrink: 0;

  .header-campaign-btn .button-text .campaign-full-text {
    display: inline;
  }
  .header-campaign-btn .button-text .campaign-short-text {
    display: none;
  }

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

  @media (max-width: 768px) {
    order: 3;
    gap: 0.5rem;
    margin-left: 0;

    .header-campaign-btn,
    .header-login-btn,
    .header-user-btn {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .header-campaign-btn,
    .header-login-btn,
    .header-user-btn {
      padding: 0.4rem 0.5rem;
      font-size: 0.75rem;
    }

    .header-login-btn .button-text {
      display: none;
    }
    /* The rule that previously hid all campaign button text (.header-campaign-btn .button-text { display: none; }) is removed. */
    /* Instead, we now toggle visibility of the specific inner spans: */
    .header-campaign-btn .button-text .campaign-full-text {
      display: none;
    }
    .header-campaign-btn .button-text .campaign-short-text {
      display: inline;
    }
  }
`;

const UserDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const UserDropdown = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1001;
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  margin-top: 0.5rem;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.1s ease;
  font-size: 0.875rem;
  color: #140e0e;

  &:hover {
    background-color: #fff5ee90;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  &.sign-out {
    color: #dc2626;
    &:hover {
      background-color: #fef2f2;
    }
  }
`;

export function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLElement>(null); // Ref for HeaderContainer
  const [actualHeaderHeight, setActualHeaderHeight] = useState(0); // State for measured height

  const notHomepage = location.pathname != "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= SCROLL_ACTIVATION_THRESHOLD) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
      // Removed setLastScrollY to simplify, as it wasn't directly used for isFixed logic beyond comparison
    };

    window.addEventListener("scroll", handleScroll);
    // Call handleScroll once on mount to set initial state if page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  useEffect(() => {
    const measureHeight = () => {
      if (headerContainerRef.current) {
        setActualHeaderHeight(headerContainerRef.current.offsetHeight);
      }
    };

    measureHeight(); // Initial measurement
    window.addEventListener("resize", measureHeight);

    // Re-measure if the user logs in/out, as this changes button layout
    // Also re-measure if path changes, as header content might differ
  }, [location.pathname, user, profile]); // Dependencies that might change header height

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleUserButtonClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate("/login");
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    // Placeholder for profile navigation
    setIsDropdownOpen(false);
  };

  const handleHistoryClick = () => {
    // Placeholder for history navigation
    setIsDropdownOpen(false);
  };

  const handleCampaignButtonClick = () => {
    if (user) {
      navigate("/create-campaign");
    } else {
      navigate(`/login?returnTo=${encodeURIComponent("/create-campaign")}`);
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
      {isFixed && actualHeaderHeight > 0 && (
        <HeaderSpacing $actualHeaderHeight={actualHeaderHeight} />
      )}
      <HeaderContainer
        ref={headerContainerRef}
        $isFixed={isFixed}
        $isTransparentPage={notHomepage}
      >
        <HeaderNav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <CompanyLogo src={KvaliLogo} alt="Kvali Logo" />
            <CompanyHandLogo
              src="/logos/hand_logo_orange.svg"
              alt="Kvali Hand Logo"
            />
          </Link>
          <HeaderSearchbar value={searchValue} onChange={handleSearchChange} />
          <ButtonsContainer>
            <Button
              className="header-campaign-btn"
              onClick={handleCampaignButtonClick}
              icon={<BsPiggyBank size={18} />}
            >
              <>
                <span className="campaign-full-text">კამპანიის დაწყება</span>
                <span className="campaign-short-text">დაწყება</span>
              </>
            </Button>
            {user ? (
              <UserDropdownWrapper ref={dropdownRef}>
                <Button
                  className="header-user-btn"
                  onClick={handleUserButtonClick}
                  icon={<FiUser size={18} />}
                >
                  {getUsername()}
                </Button>
                <UserDropdown $isVisible={isDropdownOpen}>
                  <DropdownItem onClick={handleProfileClick}>
                    <FiProfile size={16} />
                    პროფილი
                  </DropdownItem>
                  <DropdownItem onClick={handleHistoryClick}>
                    <FiClock size={16} />
                    ისტორია
                  </DropdownItem>
                  <DropdownItem className="sign-out" onClick={handleSignOut}>
                    <FiLogOut size={16} />
                    გასვლა
                  </DropdownItem>
                </UserDropdown>
              </UserDropdownWrapper>
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
