export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interuptedAt?: Date;
  finishedAt?: Date;
}

export interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

export function createCycle({ task, minutesAmount }: CreateCycleData): Cycle {
  return {
    id: crypto.randomUUID(),
    task,
    minutesAmount,
    startDate: new Date(),
  };
}
