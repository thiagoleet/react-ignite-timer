import React, { ReactNode } from "react";
import { createCycle, CreateCycleData } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";
import { ActionTypes, cyclesReducer } from "../reducers/cycle.reducer";

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
    dispatch({ type: ActionTypes.FINISH_CYCLE, payload: { activeCycleId } });
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = createCycle({ task, minutesAmount });

    dispatch({ type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } });

    setAmmountSecondsPast(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    });
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
