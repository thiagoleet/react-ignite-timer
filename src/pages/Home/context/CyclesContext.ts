import React from "react";
import { Cycle } from "../../../models/Cycle";

export interface CyclesContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: VoidFunction;
}

export const CyclesContext = React.createContext<CyclesContextData>(
  {} as CyclesContextData
);
