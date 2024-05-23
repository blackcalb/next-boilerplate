import { z } from 'zod';

export const AddRecordSchema = z.object({
  accountId: z.string().length(24),
  categoryId: z.string().length(24),
  date: z.date(),
  subject: z.string().min(1),
  type: z.enum(['income', 'expense']),
  amount: z.object({
    currency: z.string(),
    value: z.number().positive(),
  }),
  userId: z.string().length(24),
});
