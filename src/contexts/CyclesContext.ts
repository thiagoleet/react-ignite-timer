import React from "react";
import { CreateCycleData, Cycle } from "../models/Cycle";

interface CyclesContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  ammountSecondsPast: number;
  cycles: Cycle[];
  markCurrentCycleAsFinished: VoidFunction;
  updateAmmountSecondsPast: (ammount: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: VoidFunction;
}

export const CyclesContext = React.createContext<CyclesContextData>(
  {} as CyclesContextData
);
