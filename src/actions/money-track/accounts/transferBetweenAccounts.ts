'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';

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

  await dbConnect();

  const fromAccount = await BankAccount.findOne({
    _id: data.fromAccountId,
    userId,
  });

  if (!fromAccount) {
    return { error: 'From account not found' };
  }

  const toAccount = await BankAccount.findOne({
    _id: data.toAccountId,
    userId,
  });

  if (!toAccount) {
    return { error: 'To account not found' };
  }

  if (fromAccount.balance < data.amount) {
    return { error: 'Insufficient balance' };
  }

  await Promise.all([
    Movement.insertMany([
      {
        accountId: data.fromAccountId,
        date: new Date(),
        name: `Transfer to ${toAccount.name}`,
        amount: -data.amount,
        currency: fromAccount.currency,
        type: CategoryType.TransferOut,
        userId,
      },
      {
        accountId: data.toAccountId,
        date: new Date(),
        name: `Transfer from ${fromAccount.name}`,
        amount: data.amount,
        currency: fromAccount.currency,
        type: CategoryType.TransferIn,
        userId,
      },
    ]),
    BankAccount.updateOne(
      {
        _id: data.fromAccountId,
      },
      {
        balance: Math.round(100 * (fromAccount.balance - data.amount)) / 100,
      },
    ),
    BankAccount.updateOne(
      {
        _id: data.toAccountId,
      },
      {
        balance: Math.round(100 * (toAccount.balance + data.amount)) / 100,
      },
    ),
  ]);
  revalidatePath('/money-track/dashboard');

  return { data: 'Transfer successful' };
}
