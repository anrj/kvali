import { useState, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const InputCSS = css`
  width: 100%;
  outline-offset: -3px;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: inherit;
  background-color: #fdf2e9;
  color: #45260a;

  &:focus {
    outline: 3px solid rgba(243, 191, 146, 0.5);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  ${InputCSS}

  &::placeholder {
    color: #140e0e90;
    font-size: 0.8rem;
  }
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
  type?: string;
  className?: string;
}



export default function Input({ className, type, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const isPasswordType = type === 'password';

  return (
  <>
    <InputWrapper className={className}>
      <StyledInput
        type={inputType}
        {...rest}
      />
      {isPasswordType && (
        <PasswordToggleIcon type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
        </PasswordToggleIcon>
      )}
    </InputWrapper>
  </>);
}