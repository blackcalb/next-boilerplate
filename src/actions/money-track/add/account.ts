'use server';

import Prisma from '@prisma/client';
import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import { AddAccountSchema } from '@/schemas/money-track/account';

export async function createNewAccount(_: any, formData: FormData) {
  const userId = await getUserId();

  const data = {
    name: formData.get('name') as string,
    currency: formData.get('currency') as string,
    balance: Number(formData.get('initialBalance') ?? 0),
    userId,
  };

  const isValid = AddAccountSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }
  const prisma = new Prisma.PrismaClient();

  const newAccount = await prisma.accounts.create({ data });

  if (data.balance > 0) {
    await prisma.records.create({
      data: {
        accountId: newAccount.id,
        amount: {
          value: data.balance,
          currency: data.currency,
        },
        type: 'deposit',
        date: new Date(),
        subject: `Initial Balance - ${data.name}`,
        userId,
      },
    });
  }

  revalidatePath('/money-track/dashboard');

  return { data: newAccount };
}
