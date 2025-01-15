import { produce } from "immer";
import { Cycle } from "../../models/Cycle";
import { ActionTypes } from "./actions";

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interuptedAt = new Date();
      });
    }
    case ActionTypes.FINISH_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex === -1) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedAt = new Date();
      });
    }

    default:
      return state;
  }
}
