'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import { CategoryType } from '@/models/money-track/Categories';
import { AddRecordSchema } from '@/schemas/money-track/records';

import createMovement from '../movemets/createMovement';

function getDataFromFormData(
  formData: FormData,
  currency: string,
  userId: string,
) {
  const factor = formData.get('type') === CategoryType.Income ? 1 : -1;

  return {
    type: formData.get('type') as CategoryType,
    name: formData.get('name') as string,
    amount: factor * Number(formData.get('amount')),
    currency,
    accountId: formData.get('account') as string,
    categoryId: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    userId,
  };
}

export async function createNewRecord(_: any, formData: FormData) {
  await dbConnect();

  const userId = await getUserId();
  const bankId = formData.get('account') as string;

  const bank = await BankAccount.findById(bankId);

  if (!bank) throw new Error('Bank account not found ');

  const data = getDataFromFormData(formData, bank.currency, userId);

  const isValid = AddRecordSchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }

  await createMovement(data, {
    updateAccountBalance: true,
    updateBudgets: true,
  });

  revalidatePath('/money-track/dashboard');

  return {
    status: 'success',
  };
}
