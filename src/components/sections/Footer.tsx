import { styled, css } from "styled-components";
import KvaliLogo from "../../assets/logos/full_logo.svg";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

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

const FooterLink = styled.a`
  text-decoration: none;
  color: #767676;
  will-change: color;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #555555;
  }
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
            <FooterLink href="tel:+995599533969" >+995 599-533-969</FooterLink> <br />
            <FooterLink href="mailto:anrijavakhishvili@gmail.com">anrijavakhishvili@gmail.com</FooterLink>
          </p>
        </NavColList>
      </NavCol>
      <NavCol>
        <FooterHeading>პლატფორმა</FooterHeading>
        <NavColList>
          <FooterLink>რეგისტრაცია</FooterLink>
          <FooterLink>კამპანიის დაწყება</FooterLink>
          <FooterLink>Android აპლიკაცია</FooterLink>
        </NavColList>
      </NavCol>
      <NavCol>
        <FooterHeading>ჩვენს შესახებ</FooterHeading>
        <NavColList>
          <FooterLink>მომსახურების პირობები</FooterLink>
          <FooterLink>ბლოგი / სიახლეები</FooterLink>
          <FooterLink>პარტნიორები</FooterLink>
          <FooterLink>კონფიდენციალურობის <br/>პოლიტიკა</FooterLink>
        </NavColList>
      </NavCol>
      <NavCol>
        <FooterHeading>დახმარება</FooterHeading>
        <NavColList>
          <FooterLink>ხშირად დასმული კითხვები</FooterLink>
          <FooterLink>ანონიმური უკუკავშირი</FooterLink>
        </NavColList>
      </NavCol>
    </FooterContainer>
  );
}
