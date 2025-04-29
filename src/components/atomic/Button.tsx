import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

// button with an icon on its left

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  cursor: pointer;

  background-color: #45260a;
  color: floralwhite;

  &:focus {
    outline: none;
  }
`;

const ButtonIconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  scrollsTo?: string;
}

export function Button({
  children,
  icon,
  scrollsTo,
  ...rest
}: ButtonProps) {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (scrollsTo) {
      const element = document.getElementById(scrollsTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth"});
      } else {
        console.warn(`Element with ID "${scrollsTo}" not found.`);
      }
    }

    if (rest.onClick) {
      rest.onClick(event);
    }
  };


  return (
    <StyledButton type="button" {...rest} onClick={handleClick}>
      {icon && <ButtonIconWrapper>{icon}</ButtonIconWrapper>}
      {children}
    </StyledButton>
  );
}
