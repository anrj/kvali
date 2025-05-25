import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import supabase from "../utils/supabase";
import styled from "styled-components";
import KvaliLogoHand from "/logos/hand_logo_orange.svg";
import Button from "../components/atomic/Button";
import Input from "../components/atomic/Input";
import Checkbox from "../components/atomic/Checkbox";
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

const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
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

interface FieldError {
  error: boolean;
  message: string;
}

interface FormErrors {
  firstName: FieldError;
  lastName: FieldError;
  email: FieldError;
  password: FieldError;
  confirmPassword: FieldError;
  checkbox1: FieldError;
  checkbox2: FieldError;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const returnTo = searchParams.get("returnTo");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox1: false,
    checkbox2: false,
  });

  const [errors, setErrors] = useState({
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
    checkbox1: { error: false, message: "" },
    checkbox2: { error: false, message: "" },
  });

  useEffect(() => {
    if (user) {
      // Redirect to the return URL if it exists, otherwise go to campaigns
      navigate(returnTo || "/campaigns");
    }
  }, [user, navigate, returnTo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = e.target;

    if (name === "checkbox1" || name === "checkbox2") {
      setFormData({
        ...formData,
        [name]: checked,
      });

      if (checked && errors[name as keyof FormErrors].error) {
        setErrors({
          ...errors,
          [name]: { error: false, message: "" },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (errors[name as keyof FormErrors].error) {
        setErrors({
          ...errors,
          [name]: { error: false, message: "" },
        });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = {
        error: true,
        message: "შეიყვანეთ ვალიდური ელ.ფოსტა",
      };
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = {
        error: true,
        message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს",
      };
      isValid = false;
    } else if (formData.password.length > 20) {
      newErrors.password = {
        error: true,
        message: "პაროლი უნდა შეიცავდეს არაუმეტეს 20 სიმბოლოს",
      };
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = {
        error: true,
        message: "პაროლები არ ემთხვევა",
      };
      isValid = false;
    }

    if (formData.firstName.length === 0) {
      newErrors.firstName = {
        error: true,
        message: "შეიყვანეთ სახელი",
      };
      isValid = false;
    }

    if (formData.lastName.length === 0) {
      newErrors.lastName = {
        error: true,
        message: "შეიყვანეთ გვარი",
      };
      isValid = false;
    }

    if (!formData.checkbox1) {
      newErrors.checkbox1 = {
        error: true,
        message: "",
      };
      isValid = false;
    }

    if (!formData.checkbox2) {
      newErrors.checkbox2 = {
        error: true,
        message: "",
      };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }
    if (data) {
      console.log("User registered successfully:", data);

      // Navigate to the return URL if it exists, otherwise go to campaigns
      navigate(returnTo || "/campaigns");
    }
  };

  return (
    <>
      <SignInPageBackground>
        <SignInPageContainer>
          <LogoDiv>
            <KvaliLogo src={KvaliLogoHand} alt="Kvali Logo" />
          </LogoDiv>
          <SignInMessage>რეგისტრაცია</SignInMessage>
          <SignInBody
            style={{ marginTop: "1rem" }}
            noValidate
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <InputField
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                type="text"
                placeholder="სახელი"
                hasError={errors.firstName.error}
                errorMessage={errors.firstName.message}
              />
              <InputField
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                type="text"
                placeholder="გვარი"
                hasError={errors.lastName.error}
                errorMessage={errors.lastName.message}
              />
            </div>
            <InputField
              name="email"
              onChange={handleChange}
              value={formData.email}
              type="email"
              placeholder="ელ.ფოსტა"
              hasError={errors.email.error}
              errorMessage={errors.email.message}
            />
            <InputField
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="პაროლი"
              hasError={errors.password.error}
              errorMessage={errors.password.message}
            />
            <InputField
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              type="password"
              placeholder="გაიმეორეთ პაროლი"
              hasError={errors.confirmPassword.error}
              errorMessage={errors.confirmPassword.message}
            />
            <Checkboxes>
              <Checkbox
                id="checkbox1"
                name="checkbox1"
                checked={formData.checkbox1}
                onChange={handleChange}
                hasError={errors.checkbox1.error}
              >
                ვეთანხმები{" "}
                <RouterLink to="/404">წესებსა და პირობებს</RouterLink>
              </Checkbox>
              <Checkbox
                id="checkbox2"
                name="checkbox2"
                checked={formData.checkbox2}
                onChange={handleChange}
                hasError={errors.checkbox2.error}
              >
                ვეთანხმები{" "}
                <RouterLink to="/404">კონფიდენციალურობის პოლიტიკას</RouterLink>
              </Checkbox>
            </Checkboxes>
            <SubmitButton style={{ marginTop: "1rem" }} type="submit">
              შესვლა
            </SubmitButton>
          </SignInBody>
        </SignInPageContainer>
      </SignInPageBackground>
    </>
  );
}
