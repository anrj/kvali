import { useState, FormEvent, useEffect } from "react";
import supabase from "../utils/supabase";
import styled from "styled-components";
import KvaliLogoHand from "/logos/hand_logo_orange.svg";
import Button from "../components/atomic/Button";
import Input from "../components/atomic/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignInPageBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e98b38;
  background-image: linear-gradient(
      to bottom,
      rgba(233, 139, 56, 0.8),
      rgba(233, 139, 56, 0.8)
    ),
    url("/img/signin-background.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    background-color: #faf9f5;
  }
  @media (max-width: 480px) {
    background-color: #faf9f5;
  }
`;

const SignInPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #faf9f5;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 0px 14px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid #dad8d4;

  width: 375px;
  min-height: 400px;

  @media (max-width: 768px) {
    box-shadow: none;
    border: 0px;
    width: 85vw;
  }

  @media (max-width: 480px) {
    box-shadow: none;
    border: 0px;
    width: 85vw;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const KvaliLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const SignInMessage = styled.h1`
  font-size: 1.4rem;
  font-family: "TBCX", sans-serif;
  font-weight: 300;
  color: #333;
  margin: 8px 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0 0 0;
  gap: 8px;

  & > button {
    width: 100%;
    height: 45px;
    font-size: 14px;
    font-family: "TBCX", sans-serif;
    color: #140e0ebb;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid #dad8d4;
    cursor: pointer;
    transition: background-color 0.2s ease;
    transition: all 0.2s ease;

    &:hover {
      border: 1px solid #e8e6dc;
      background-color: #e8e6dc;
    }
  }
`;

const OrDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 10px;
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
  /* margin: 0.3rem 0; */
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 45px;

  &:hover {
    background-color: #45260a;
  }
`;

const RouterLink = styled(Link)`
  text-decoration: underline;
  color: #140e0e;
  cursor: pointer;

  &:visited,
  &:link {
    color: #140e0e;
  }
`;

const ForgotPassword = styled(Link)`
  align-self: flex-start;
  font-size: 0.7rem;
  margin: 0.1rem 0rem;
  transition: color 0.2s ease;
  cursor: pointer;
  color: #140e0e;
  text-decoration: none;

  &:visited,
  &:link {
    text-decoration: underline;
    color: #140e0e;
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const returnTo = searchParams.get("returnTo");

  useEffect(() => {
    if (user) {
      // Redirect to the return URL if it exists, otherwise go to campaigns
      navigate(returnTo || "/campaigns");
    }
  }, [user, navigate, returnTo]);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${returnTo || '/campaigns'}`
      }
    });
    
    if (error) {
      console.error('Error signing in with Google:', error.message);
      setError('Google-ით შესვლისას მოხდა შეცდომა');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
      if (error.message === "Invalid login credentials") {
        setError("ელ.ფოსტა ან პაროლი არასწორია");
      } else {
        setError("შესვლისას მოხდა შეცდომა");
      }
    } else {
      console.log("Successfully signed in");
    }
  };

  return (
    <>
      <SignInPageBackground>
        <SignInPageContainer>
          <LogoDiv>
            <KvaliLogo src={KvaliLogoHand} alt="Kvali Logo" />
          </LogoDiv>
          <SignInMessage>ავტორიზაცია</SignInMessage>
          <span>
            არ გაქვთ ანგარიში?{" "}
            <RouterLink
              to={`/register${
                returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""
              }`}
            >
              რეგისტრაცია
            </RouterLink>
          </span>
          <ButtonDiv>
            <Button icon={"/logos/facebook-svgrepo-com.svg"}>
              Facebook-ით შესვლა
            </Button>
            <Button 
              icon={"/logos/google-color-svgrepo-com.svg"}
              onClick={handleGoogleSignIn}
            >
              Google-ით შესვლა
            </Button>
          </ButtonDiv>
          <OrDiv>
            <OrLine />
            <span style={{ userSelect: "none" }}>ან</span>
            <OrLine />
          </OrDiv>
          <SignInBody noValidate onSubmit={handleSubmit}>
            <InputField
              name="email"
              type="text"
              placeholder="ელ.ფოსტა"
              onChange={handleEmailChange}
              value={email}
              hasError={!!error}
              errorMessage={error}
            />
            <InputField
              name="password"
              type="password"
              placeholder="პაროლი"
              onChange={handlePasswordChange}
              value={password}
              hasError={!!error}
            />
            <ForgotPassword to="/404">დაგავიწყდათ პაროლი?</ForgotPassword>
            <SubmitButton type="submit">შესვლა</SubmitButton>
          </SignInBody>
        </SignInPageContainer>
      </SignInPageBackground>
    </>
  );
}
