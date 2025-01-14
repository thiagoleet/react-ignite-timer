import * as zod from "zod";

export const MINIMUM_MINUTES_AMOUNT = 5;
export const MAXIMUM_MINUTES_AMOUNT = 60;

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(MINIMUM_MINUTES_AMOUNT)
    .max(MAXIMUM_MINUTES_AMOUNT),
});

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
