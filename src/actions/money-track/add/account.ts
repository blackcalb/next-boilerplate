'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';
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
  await dbConnect();

  const saveAccount = await BankAccount.create(data);

  if (data.balance > 0) {
    await Movement.create({
      accountId: saveAccount._id,
      amount: data.balance,
      currency: data.currency,
      type: CategoryType.Deposit,
      date: new Date(),
      name: `Initial Balance - ${data.name}`,
      userId,
    });
  }

  revalidatePath('/money-track/dashboard');

  return { status: 'success' };
}
