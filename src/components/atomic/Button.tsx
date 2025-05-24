import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  white-space: nowrap;
  font-family: inherit;
  font-weight: 400;
  transition: background-color 0.1s ease;
  cursor: pointer;

  background-color: #5f340c;
  color: floralwhite;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const ButtonIconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode | string;
  scrollsTo?: string;
}

export default function Button({
  children,
  icon,
  scrollsTo,
  ...rest
}: ButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (scrollsTo) {
      const element = document.getElementById(scrollsTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with ID "${scrollsTo}" not found.`);
      }
    }

    if (rest.onClick) {
      rest.onClick(event);
    }
  };

  let iconElement: ReactNode = null;
  if (icon) {
    if (typeof icon === "string") {
      iconElement = (
        <img
          src={icon}
          alt=""
          style={{
            height: "1.5em",
            width: "auto",
            display: "block",
          }}
          loading="lazy"
          decoding="async"
        />
      );
    } else {
      iconElement = icon;
    }
  }

  return (
    <StyledButton type="button" {...rest} onClick={handleClick}>
      {iconElement && <ButtonIconWrapper>{iconElement}</ButtonIconWrapper>}
      {children}
    </StyledButton>
  );
}
