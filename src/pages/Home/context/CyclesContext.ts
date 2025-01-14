import React from "react";
import { Cycle } from "../../../models/Cycle";

export interface CyclesContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  ammountSecondsPast: number;
  markCurrentCycleAsFinished: VoidFunction;
  updateAmmountSecondsPast: (ammount: number) => void;
}

export const CyclesContext = React.createContext<CyclesContextData>(
  {} as CyclesContextData
);
