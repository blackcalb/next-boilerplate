import { z } from 'zod';

import { CategoryType } from '@/models/money-track/Categories';

export const NewCategorySchema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  userId: z.string().length(24),
});
