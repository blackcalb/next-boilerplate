import { z } from 'zod';

export const NewCategorySchema = z.object({
  name: z.string().nonempty(),
  type: z.enum(['expense', 'income']),
});
