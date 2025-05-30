import { styled, css } from "styled-components";
import KvaliLogo from "/logos/full_logo.svg";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const currentYear = new Date().getFullYear();

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  gap: 3.3rem;
  padding: 6rem 10rem 7rem;
  border-top: 1px solid #eee;

  @media (max-width: 705px) {
    flex-wrap: wrap-reverse;
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
`;

const FooterHeading = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1.8rem 0;
`;

const NavColList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 1.2rem;
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
`;

const ContactLink = styled.a`
  ${LinkStyle}
`;


const FooterText = styled.p`
  text-decoration: none;
  margin: 0;
`;

const CompanyLogo = styled.img`
  align-self: flex-start;
  display: block;
  height: 3.2rem;
`;

const SocialLogoDiv = styled.div`
  display: flex;
  gap: 2.2rem;
  margin: 0.3rem 0 1rem 0.2rem;
`;

const SocialLogoStyle = css`
  scale: 1.7;
  color: #767676;
  margin: 2rem 0 0 0;
  will-change: color;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: #555555;
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
`;
export function Footer() {
  return (
    <FooterContainer>
      <NavCol>
        <CompanyLogo src={KvaliLogo} alt="Kvali Logo"/>
        <SocialLogoDiv>
          <InstagramLogo />
          <FacebookLogo />
          <XLogo />
        </SocialLogoDiv>
        <Copyright>
          Copyright © {currentYear} by Kvali. <br /> All rights reserved.
        </Copyright>
      </NavCol>
      <NavCol as="address">
        <FooterHeading>კონტაქტი</FooterHeading>
        <NavColList>
          <FooterText>
            Akhalgazrdoba Ave. <br /> Lane 5/7, Kutaisi, Georgia
          </FooterText>
          <p style={{ marginTop: "1.2rem" }}>
            <ContactLink href="tel:+995599533969" >+995 599-533-969</ContactLink> <br />
            <ContactLink href="mailto:contact@kvali.ge">contact@kvali.ge</ContactLink>
          </p>
        </NavColList>
      </NavCol>
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
          <FooterLink to="/404">კონფიდენციალურობის <br/>პოლიტიკა</FooterLink>
        </NavColList>
      </NavCol>
      <NavCol>
        <FooterHeading>დახმარება</FooterHeading>
        <NavColList>
          <FooterLink to="/404">ხშირად დასმული კითხვები</FooterLink>
          <FooterLink to="/404">წერილის მიწერა</FooterLink>
          <FooterLink to="/404">ანონიმური უკუკავშირი</FooterLink>
        </NavColList>
      </NavCol>
    </FooterContainer>
  );
}
