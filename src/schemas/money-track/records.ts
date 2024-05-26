import { z } from 'zod';

import { CategoryType } from '@/models/money-track/Categories';

export const AddRecordSchema = z.object({
  accountId: z.string().length(24),
  categoryId: z.string().length(24),
  date: z.date(),
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  amount: z.number(),
  currency: z.string(),
  userId: z.string().length(24),
});
