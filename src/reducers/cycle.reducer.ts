import { Cycle } from "../models/Cycle";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERUPT_CURRENT_CYCLE = "INTERUPT_CURRENT_CYCLE",
  FINISH_CYCLE = "FINISH_CYCLE",
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERUPT_CURRENT_CYCLE:
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
    case ActionTypes.FINISH_CYCLE:
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
}
