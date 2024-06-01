'use server';

import type { ObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import { CategoryType } from '@/models/money-track/Categories';
import { AddAccountSchema } from '@/schemas/money-track/account';

import createMovement from '../movemets/createMovement';

const DEFAULT_PATH = '/money-track/dashboard';

export async function createNewAccount(_: any, formData: FormData) {
  const userId = await getUserId();

  const data = {
    name: formData.get('name') as string,
    currency: formData.get('currency') as string,
    balance: Number(formData.get('initialBalance') ?? 0),
    userId,
  };

  const refreshPath = (formData.get('path') as string) ?? DEFAULT_PATH;

  const isValid = AddAccountSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }
  await dbConnect();

  const saveAccount = await BankAccount.create(data);

  if (data.balance > 0) {
    await createMovement({
      bankAccountId: saveAccount._id as ObjectId,
      amount: data.balance,
      currency: data.currency,
      type: CategoryType.Deposit,
      date: new Date(),
      name: `Initial Balance - ${data.name}`,
      userId,
    });
  }

  revalidatePath(refreshPath);

  return { status: 'success' };
}
