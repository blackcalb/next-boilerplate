import { z } from 'zod';

export const AddBudgetSchema = z.object({
  name: z.string().min(1),
  from: z.date(),
  to: z.date(),
  categoryIds: z.array(z.string().min(1)).min(1),
  budget: z.number().nonnegative(),
  addPreviousCreatedRecords: z.boolean().optional(),
});
