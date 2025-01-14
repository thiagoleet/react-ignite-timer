export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interuptedAt?: Date;
}

export function createNewCycle(task: string, minutesAmount: number): Cycle {
  return {
    id: crypto.randomUUID(),
    task,
    minutesAmount,
    startDate: new Date(),
  };
}
