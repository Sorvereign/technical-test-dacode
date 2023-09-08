import { z } from "zod";

export type Evaluation = z.infer<typeof EvaluationEnum>;

export const EvaluationEnum = z.enum(["correct", "present", "absent"]);
export const GameStatusEnum = z.enum([
  "IN_PROGRESS",
  "FAIL",
  "WIN",
  "EVALUATE_IN_PROGRESS",
]);

export const gameState = z.object({
  answers: z.array(z.string()),
  solution: z.string(),
  boardState: z.array(z.string()),
  evaluations: z.array(z.array(EvaluationEnum)),
  letterStatus: z.record(EvaluationEnum),
  currentRowIndex: z.number(),
  status: GameStatusEnum,
  statistics: z.object({
    wins: z.number(),
    lost: z.number(),
  }),
});
