import { ButtonVariant } from "./Button.schema";
import { ButtonContainer } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonVariant;
}

export default function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
