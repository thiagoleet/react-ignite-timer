import React, { act, ReactNode } from "react";
import { createCycle, CreateCycleData, Cycle } from "../models/Cycle";
import { CyclesContext } from "./CyclesContext";

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = React.useReducer(
    (state: CyclesState, action) => {
      console.log(state);
      console.log(action);

      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case "INTERUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload.activeCycleId) {
                return {
                  ...cycle,
                  interuptedAt: new Date(),
                };
              }

              return cycle;
            }),
            activeCycleId: null,
          };
        case "FINISH_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedAt: new Date(),
                };
              }

              return cycle;
            }),
            activeCycleId: null,
          };

        default:
          return state;
      }
    },
    { cycles: [], activeCycleId: null }
  );

  const { cycles, activeCycleId } = cyclesState;

  const [ammountSecondsPast, setAmmountSecondsPast] = React.useState(0);

  function updateAmmountSecondsPast(ammount: number) {
    setAmmountSecondsPast(ammount);
  }

  function markCurrentCycleAsFinished() {
    dispatch({ type: "FINISH_CYCLE", payload: { activeCycleId } });
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle = createCycle({ task, minutesAmount });

    dispatch({ type: "ADD_NEW_CYCLE", payload: { newCycle } });

    setAmmountSecondsPast(0);
  }

  function interruptCurrentCycle() {
    dispatch({ type: "INTERUPT_CURRENT_CYCLE", payload: { activeCycleId } });
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
