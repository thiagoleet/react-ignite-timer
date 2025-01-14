import React, { ReactNode } from "react";
import { createCycle, CreateCycleData, Cycle } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = React.useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null);
  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(0);

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

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = createCycle({ task, minutesAmount });

    setActiveCycleId(newCycle.id);
    setCycles((cycles) => [...cycles, newCycle]);
    setAmmountSecondsPast(0);

    // newCycleForm.reset();
  }

  function interruptCurrentCycle() {
    setActiveCycleId(null);
    markCurrentCycleAsInterupted();
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle: cycles.find((cycle) => cycle.id === activeCycleId),
        activeCycleId,
        ammountSecondsPast,
        cycles,
        markCurrentCycleAsFinished,
        updateAmmountSecondsPast,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
