import React, { ReactNode } from "react";
import { createCycle, CreateCycleData } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interuptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = React.useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cyclesState"
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

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

  React.useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cyclesState", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
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
