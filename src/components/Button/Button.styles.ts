import styled from "styled-components";
import { ButtonVariant } from "./Button.schema";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  cursor: pointer;
  color: ${(props) => props.theme.white};
  border: none;
  border-radius: 5px;

  background-color: ${(props) => props.theme["green-500"]};

  &:hover {
    filter: brightness(0.9);
  }
`;
