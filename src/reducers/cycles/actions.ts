import { Cycle } from "../../models/Cycle";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERUPT_CURRENT_CYCLE = "INTERUPT_CURRENT_CYCLE",
  FINISH_CYCLE = "FINISH_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.FINISH_CYCLE,
  };
}

export function interuptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERUPT_CURRENT_CYCLE,
  };
}
