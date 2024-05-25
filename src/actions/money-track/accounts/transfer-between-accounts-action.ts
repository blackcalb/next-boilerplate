'use server';

import Prisma from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getUserId from '@/actions/auth/getUserId';

const transferBetweenAccountsSchema = z.object({
  fromAccountId: z.string().length(24),
  toAccountId: z.string().length(24),
  amount: z.number().positive(),
});

export async function transferBetweenAccountAction(_: any, formData: FormData) {
  const userId = await getUserId();

  if (!userId) {
    return { error: 'User not found' };
  }
  const data = {
    fromAccountId: formData.get('fromAccountId') as string,
    toAccountId: formData.get('toAccountId') as string,
    amount: Number(formData.get('amount') ?? 0),
  };

  const isValid = transferBetweenAccountsSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  const prisma = new Prisma.PrismaClient();

  const fromAccount = await prisma.accounts.findUnique({
    where: {
      id: data.fromAccountId,
      userId,
    },
  });

  if (!fromAccount) {
    return { error: 'From account not found' };
  }

  const toAccount = await prisma.accounts.findUnique({
    where: {
      id: data.toAccountId,
      userId,
    },
  });

  if (!toAccount) {
    return { error: 'To account not found' };
  }

  if (fromAccount.balance < data.amount) {
    return { error: 'Insufficient balance' };
  }

  await Promise.all([
    prisma.records.createMany({
      data: [
        {
          accountId: data.fromAccountId,
          date: new Date(),
          subject: `Transfer to ${toAccount.name}`,
          amount: {
            value: -data.amount,
            currency: fromAccount.currency,
          },
          type: 'transfer',
          userId,
        },
        {
          accountId: data.toAccountId,
          date: new Date(),
          subject: `Transfer from ${fromAccount.name}`,
          amount: {
            value: data.amount,
            currency: fromAccount.currency,
          },
          type: 'transfer',
          userId,
        },
      ],
    }),
    prisma.accounts.update({
      where: {
        id: data.fromAccountId,
      },
      data: {
        balance: {
          decrement: data.amount,
        },
      },
    }),
    prisma.accounts.update({
      where: {
        id: data.toAccountId,
      },
      data: {
        balance: {
          increment: data.amount,
        },
      },
    }),
  ]);
  revalidatePath('/money-track/dashboard');

  return { data: 'Transfer successful' };
}
