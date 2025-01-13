import styled, { css } from "styled-components";
import { ButtonVariant } from "./Button.schema";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  cursor: pointer;

  ${({ variant }) =>
    css`
      background-color: ${buttonVariants[variant]};
    `}
`;
