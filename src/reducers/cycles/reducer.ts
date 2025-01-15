import { Cycle } from "../../models/Cycle";
import { ActionTypes } from "./actions";

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload!.newCycle],
        activeCycleId: action.payload!.newCycle!.id,
      };
    case ActionTypes.INTERUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
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
