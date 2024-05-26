import { z } from 'zod';

export const AddAccountSchema = z.object({
  name: z.string().min(1),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']),
  initialBalance: z.number().nonnegative().optional(),
  userId: z.string().length(24),
});

export const SignUpUserSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1),
    password: z.string().min(6),
    rePassword: z.string().min(6),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  });
