import React from "react";
import { HandPalm, Play } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import {
  NewCycleFormData,
  newCycleFormValidationSchema,
} from "./NewCycleFormData.schema";
import { CyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";

export default function HomePage() {
  const { cycles, activeCycleId, createNewCycle, interruptCurrentCycle } =
    React.useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const task = newCycleForm.watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    newCycleForm.reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={newCycleForm.handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={interruptCurrentCycle}
          >
            <HandPalm size={24} />
            Pausar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
