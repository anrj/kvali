import { useState, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const InputCSS = css`
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #dad8d4;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: inherit;
  background-color: #fdf2e9;
  color: #45260a;
  transition: box-shadow 0.2s ease-out, border-color 0.2s ease-out;
  box-shadow: inset 0 0 0 0px transparent;
  outline: none;
  /* outline-offset: -3px; */
`;

const ErrorMessage = styled.span`
  padding: 0;
  font-size: 12px;
  font-weight: 300;
  color: #cc777b;
  /* visibility: hidden; */
`;

const Flexcolumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  ${InputCSS}

  &::placeholder {
    color: #140e0e90;
    font-size: 0.8rem;
  }

  /* Remove spinner arrows from number inputs */
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  &:hover {
    transition: border 0.2s ease;
    border: ${(props) =>
      props.$hasError ? "1px solid #e8aea8" : "1px solid #bbbbbb"};
  }

  &:focus {
    /* outline: 3px solid rgba(243, 191, 146, 0.5); */
    border-color: rgba(243, 191, 146, 0.7);
    box-shadow: inset 0 0 0 2px rgba(243, 191, 146, 0.5);
    transition: box-shadow 0.2s ease-in, border-color 0.2s ease-in;
  }

  ${(props) =>
    props.$hasError &&
    css`
      border-color: #e8aea8;
      box-shadow: inset 0 0 0 2px #e8aaa46f;
    `}
`;

const PasswordToggleIcon = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  z-index: 2;

  &:focus {
    outline: none;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  type?: string;
  className?: string;
}

export default function Input({
  className,
  type,
  hasError,
  errorMessage,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;
  const isPasswordType = type === "password";

  return (
    <>
      <Flexcolumn>
        <InputWrapper className={className}>
          <StyledInput type={inputType} $hasError={hasError} {...rest} />
          {isPasswordType && (
            <PasswordToggleIcon
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </PasswordToggleIcon>
          )}
        </InputWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Flexcolumn>
    </>
  );
}
