import { ChangeEvent } from "react";
import styled, { css } from "styled-components";

interface CheckboxProps {
  id: string;
  name: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  children: React.ReactNode;
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })<{
  $hasError?: boolean;
}>`
  appearance: none;
  padding: 8px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid #dad8d4;
  margin: 0;
  flex: 0 0 auto;

  &:checked {
    background-image: url("/img/checkbox-cmark.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid #bbbbbb;
  }

  ${(props) =>
    props.$hasError &&
    css`
      border-color: #e8aea8;
      box-shadow: 0 0 0 2px #e8aaa46f;
    `}
`;

const CheckboxLabel = styled.label`
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 2%;
  user-select: none;
  margin-left: 0.5rem;
`;

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  hasError,
  children,
}: CheckboxProps) {
  return (
    <CheckboxContainer>
      <StyledCheckbox
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        $hasError={hasError}
      />
      <CheckboxLabel htmlFor={id}>{children}</CheckboxLabel>
    </CheckboxContainer>
  );
}
