import React from "react";
import {
  MAXIMUM_MINUTES_AMOUNT,
  MINIMUM_MINUTES_AMOUNT,
} from "../../NewCycleFormData.schema";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { useFormContext } from "react-hook-form";

export default function NewCycleForm() {
  const { activeCycle } = React.useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={MINIMUM_MINUTES_AMOUNT}
        min={MINIMUM_MINUTES_AMOUNT}
        max={MAXIMUM_MINUTES_AMOUNT}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
