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
import { createNewCycle, Cycle } from "../../models/Cycle";
import { CyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";

export default function HomePage() {
  const [cycles, setCycles] = React.useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null);
  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(0);

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

  function updateAmmountSecondsPast(ammount: number) {
    setAmmountSecondsPast(ammount);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedAt: new Date(),
          };
        }

        return cycle;
      })
    );
  }

  function markCurrentCycleAsInterupted() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interuptedAt: new Date(),
          };
        }

        return cycle;
      })
    );
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle = createNewCycle(data.task, data.minutesAmount);

    setActiveCycleId(newCycle.id);
    setCycles((cycles) => [...cycles, newCycle]);
    setAmmountSecondsPast(0);

    newCycleForm.reset();
  }

  function handleInteruptCycle() {
    setActiveCycleId(null);
    markCurrentCycleAsInterupted();
  }

  return (
    <HomeContainer>
      <form onSubmit={newCycleForm.handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            ammountSecondsPast,
            markCurrentCycleAsFinished,
            updateAmmountSecondsPast,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />

          {activeCycle ? (
            <StopCountdownButton
              type="button"
              onClick={handleInteruptCycle}
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
        </CyclesContext.Provider>
      </form>
    </HomeContainer>
  );
}
