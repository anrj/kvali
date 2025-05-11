import { useState } from "react";
import styled from "styled-components";
import supabase from "../utils/supabase";
import KvaliLogoHand from "/assets/logos/hand_logo_orange.svg";
import Button from "../components/atomic/Button";
import Input from "../components/atomic/Input";
// import { FaArrowLeft } from "react-icons/fa6";

const SignInPageBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e98b38;
  background-image: url('/assets/img/signin-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SignInPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  width: 375px;
  min-height: 400px;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;

  /* margin-top: 1rem; */
`;

const KvaliLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const SignInMessage = styled.h1`
  font-size: 1.4rem;
  font-family: 'TBCX', sans-serif;
  font-weight: 300;
  color: #333;
  margin: 8px 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0 20px 0;
  gap: 8px;

  & > button {
    width: 95%;
    height: 45px;
    font-size: 14px;  
    font-family: 'TBCX', sans-serif;
    color: #140e0ebb;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid #140e0e90;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
      border: 1px solid #140e0e;
      color: #140e0e;
    }
  }
`;

const OrDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const OrLine = styled.div`
  margin: 0 10px;
  flex-grow: 1;
  height: 1px;
  overflow: hidden;
  border-radius: 2px;
  background-color: #ccccccaa;
`;

const SignInBody = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 10px 0;
  gap: 8px;
`;

const InputField = styled(Input)`
  margin: 0.3rem 0;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 45px;

  &:hover {
    background-color: #45260a;
  }
`;

const ForgotPassword = styled.a`
  align-self: flex-start;
  font-size: 0.7rem;
  margin: 0.1rem 0rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #140e0e;
  }
`;

export function SignInPage() {
  return (
    <>
      <SignInPageBackground>
        <SignInPageContainer>
          <LogoDiv>
            <KvaliLogo src={KvaliLogoHand} alt="Kvali Logo" />
          </LogoDiv>
          <SignInMessage>ავტორიზაცია</SignInMessage>
          <ButtonDiv>
            <Button icon={"/assets/logos/facebook-color-svgrepo-com.svg"} >Facebook-ით შესვლა</Button>
            <Button icon={"/assets/logos/google-color-svgrepo-com.svg"}>Google-ით შესვლა</Button>
          </ButtonDiv>
          <OrDiv>
            <OrLine />
            <span>ან</span>
            <OrLine />
          </OrDiv>
          <SignInBody noValidate>
            <InputField type="text" placeholder="ელ.ფოსტა" />
            <SubmitButton type="submit">შესვლა</SubmitButton>
          </SignInBody>
        </SignInPageContainer>
      </SignInPageBackground>
    </>
  );
}

export default function SignInPage_Login() {
  return (
    <>
      <SignInPageBackground>
        <SignInPageContainer>
          <LogoDiv>
            <KvaliLogo src={KvaliLogoHand} alt="Kvali Logo" />
          </LogoDiv>
          <SignInMessage>ავტორიზაცია</SignInMessage>
          <SignInBody style={{marginTop: "1rem"}} noValidate>
            <InputField style={{marginBottom: "0.2rem"}} type="email" placeholder="ელ.ფოსტა" />
            <InputField style={{margin: "0"}} type="password" placeholder="პაროლი" />
            <ForgotPassword>დაგავიწყდათ პაროლი?</ForgotPassword>
            <SubmitButton style={{marginTop: "1rem"}} type="submit">შესვლა</SubmitButton>
          </SignInBody>
        </SignInPageContainer>
      </SignInPageBackground>
    </>
  );
};