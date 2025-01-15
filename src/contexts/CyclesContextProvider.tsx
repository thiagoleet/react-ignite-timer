import React, { ReactNode } from "react";
import { createCycle, CreateCycleData } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interuptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = React.useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cyclesState;

  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(0);

  function updateAmmountSecondsPast(ammount: number) {
    setAmmountSecondsPast(ammount);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = createCycle({ task, minutesAmount });

    dispatch(addNewCycleAction(newCycle));

    setAmmountSecondsPast(0);
  }

  function interruptCurrentCycle() {
    dispatch(interuptCurrentCycleAction());
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
