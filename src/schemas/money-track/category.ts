import { z } from 'zod';

export const NewCategorySchema = z.object({
  name: z.string().min(1),
  type: z.enum(['expense', 'income']),
  userId: z.string().length(24),
});
