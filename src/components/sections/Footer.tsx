import { styled, css } from "styled-components";
import KvaliLogo from "/logos/full_logo.svg";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const currentYear = new Date().getFullYear();

const FooterSection = styled.section`
  padding: 6rem 4rem 3rem;
  border-top: 1px solid #eee;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 4rem 2rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem 2rem;
  }
`;

const FooterContainer = styled.footer`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    align-items: stretch;
    max-width: 100%;
    padding: 0;
  }
`;

const NavColRow1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;
  margin-left: 3rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    margin-left: 0.75rem;
  }
`;

const NavColRow2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
    gap: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    margin-top: 0.8rem;
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  align-items: flex-start;
  min-width: 120px;
  max-width: 200px;
  flex: 0.8;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    min-width: auto;
    max-width: none;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    text-align: left;
    min-width: 0;
    max-width: none;
    flex: 1;
  }
`;

const ContactCol = styled(NavCol)`
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: none;
  }

  @media (max-width: 480px) {
    flex: 1.2;
    max-width: none;
  }
`;

const FooterHeading = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1.8rem 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin: 0 0 0.6rem 0;
    text-align: left;
  }
`;

const NavColList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 1.2rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.9rem;
    align-items: center;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
    align-items: flex-start;
  }
`;

const LinkStyle = css`
  text-decoration: none;
  color: #767676;
  will-change: color;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #555555;
  }
`;
const FooterLink = styled(NavLink)`
  ${LinkStyle}
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    text-align: left;
    line-height: 1.2;
  }
`;

const ContactLink = styled.a`
  ${LinkStyle}
`;

const ContactInfo = styled.p`
  margin-top: 1.2rem;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    text-align: left;
    margin-top: 0.5rem;
    font-size: 0.65rem;
    line-height: 1.3;
  }
`;

const FooterText = styled.p`
  text-decoration: none;
  margin: 0;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    text-align: left;
    font-size: 0.65rem;
    line-height: 1.3;
  }
`;

const CompanyLogo = styled.img`
  align-self: flex-start;
  display: block;
  height: 3.2rem;
  max-width: 100%;

  @media (max-width: 768px) {
    align-self: center;
    height: 2.8rem;
  }

  @media (max-width: 480px) {
    height: 1.6rem;
    align-self: flex-start;
  }
`;

const SocialLogoDiv = styled.div`
  display: flex;
  gap: 2.2rem;
  margin: 0.3rem 0 1rem 0.2rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    margin: 1rem 0;
    gap: 2rem;
    align-self: center;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    margin: 0.3rem 0 0.3rem 0;
    align-self: flex-start;
  }
`;

const SocialLogoStyle = css`
  scale: 1.7;
  color: #767676;
  margin: 2rem 0 0 0;
  will-change: color;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #555555;
  }

  @media (max-width: 768px) {
    scale: 1.5;
    margin: 1rem 0 0 0;
  }

  @media (max-width: 480px) {
    scale: 1;
    margin: 0.2rem 0 0 0;
  }
`;

const InstagramLogo = styled(IoLogoInstagram)`
  ${SocialLogoStyle};
`;

const FacebookLogo = styled(IoLogoFacebook)`
  ${SocialLogoStyle};
`;

const XLogo = styled(FaXTwitter)`
  ${SocialLogoStyle};
`;

const Copyright = styled.p`
  margin: 2rem 0 0 0;
  font-size: 0.7rem;
  text-align: left;

  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
    font-size: 0.65rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    margin: 0.3rem 0 0 0;
    text-align: left;
    line-height: 1.2;
  }
`;
export function Footer() {
  return (
    <FooterSection>
      <FooterContainer>
        <NavColRow2>
          <NavCol>
            <CompanyLogo src={KvaliLogo} alt="Kvali Logo" />
            <SocialLogoDiv>
              <InstagramLogo />
              <FacebookLogo />
              <XLogo />
            </SocialLogoDiv>
            <Copyright>
              © {currentYear} კვალი. <br /> ყველა უფლება დაცულია.
            </Copyright>
          </NavCol>
          <ContactCol as="address">
            <FooterHeading>კონტაქტი</FooterHeading>
            <NavColList>
              <FooterText>
                ახალგაზრდობის გამზირი. <br></br> მე-5 შესახვევი, <br /> ქუთაისი,
                4600 საქართველო
              </FooterText>
              <ContactInfo>
                <ContactLink href="tel:+995599533969">
                  +995 599-533-969
                </ContactLink>{" "}
                <br />
                <ContactLink href="mailto:contact@kvali.ge">
                  contact@kvali.ge
                </ContactLink>
              </ContactInfo>
            </NavColList>
          </ContactCol>
        </NavColRow2>
        <NavColRow1>
          <NavCol>
            <FooterHeading>პლატფორმა</FooterHeading>
            <NavColList>
              <FooterLink to="/register">რეგისტრაცია</FooterLink>
              <FooterLink to="/create-campaign">კამპანიის დაწყება</FooterLink>
              <FooterLink to="/campaigns">კამპანიების ნახვა</FooterLink>
              <FooterLink to="/404">Android აპლიკაცია</FooterLink>
            </NavColList>
          </NavCol>
          <NavCol>
            <FooterHeading>ჩვენს შესახებ</FooterHeading>
            <NavColList>
              <FooterLink to="/404">მომსახურების პირობები</FooterLink>
              <FooterLink to="/404">ბლოგი / სიახლეები</FooterLink>
              <FooterLink to="/404">პარტნიორები</FooterLink>
              <FooterLink to="/404">
                კონფიდენციალურობის <br />
                პოლიტიკა
              </FooterLink>
            </NavColList>
          </NavCol>
          <NavCol>
            <FooterHeading>დახმარება</FooterHeading>
            <NavColList>
              <FooterLink to="/404">ხშირად დასმული კითხვები</FooterLink>
              <FooterLink to="/404">წერილის მიწერა</FooterLink>
              <FooterLink to="/404">
                ანონიმური <br></br> უკუკავშირი
              </FooterLink>
            </NavColList>
          </NavCol>
        </NavColRow1>
      </FooterContainer>
    </FooterSection>
  );
}
