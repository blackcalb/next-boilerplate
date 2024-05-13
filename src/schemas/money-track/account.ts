import { z } from 'zod';

export const AddAccountSchema = z.object({
  name: z.string().min(1),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']),
  initialBalance: z.number().nonnegative().optional(),
});
