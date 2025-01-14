export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function createNewCycle(task: string, minutesAmount: number): Cycle {
  return {
    id: crypto.randomUUID(),
    task,
    minutesAmount,
  };
}
