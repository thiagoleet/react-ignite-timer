import { Play } from "@phosphor-icons/react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from "./styles";

export default function HomePage() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            type="text"
            id="task"
            name="task"
          />

          <label htmlFor="minutesAmount">durante</label>
          <input
            type="number"
            id="minutesAmount"
            name="minutesAmount"
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  );
}
