import React, { ReactNode } from "react";
import { createCycle, CreateCycleData, Cycle } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = React.useReducer((state: Cycle[], action: any) => {
    console.log(state);
    console.log(action);

    if (action.type === "ADD_NEW_CYCLE") {
      return [...state, action.payload.newCycle];
    }

    return state;
  }, []);
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null);
  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(0);

  function updateAmmountSecondsPast(ammount: number) {
    setAmmountSecondsPast(ammount);
  }

  function markCurrentCycleAsFinished() {
    dispatch({ type: "FINISH_CYCLE", payload: { activeCycleId } });
  }

  function markCurrentCycleAsInterupted() {
    dispatch({ type: "INTERUPT_CURRENT_CYCLE", payload: { activeCycleId } });
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = createCycle({ task, minutesAmount });

    dispatch({ type: "ADD_NEW_CYCLE", payload: { newCycle } });
    setActiveCycleId(newCycle.id);
    setAmmountSecondsPast(0);
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
