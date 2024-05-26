'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import Budget from '@/models/money-track/Budgets';
import { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';
import { AddRecordSchema } from '@/schemas/money-track/records';

function getDataFromFormData(
  formData: FormData,
  currency: string,
  userId: string,
) {
  const factor = formData.get('type') === CategoryType.Income ? 1 : -1;

  return {
    type: formData.get('type') as string,
    name: formData.get('name') as string,
    amount: factor * Number(formData.get('amount')),
    currency,
    accountId: formData.get('account') as string,
    categoryId: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    userId,
  };
}

async function updateBalanceAccount(bankId: string, amount: number) {
  await dbConnect();

  const bank = await BankAccount.findById(bankId);

  if (!bank) throw new Error('Bank account not found ');

  await BankAccount.findByIdAndUpdate(bankId, {
    balance: bank.balance + amount,
  });
}

async function updateBudgetUsedAmount(
  categoryId: string,
  transactionType: CategoryType,
  amount: number,
  date: Date,
) {
  if (transactionType !== CategoryType.Expense) return;

  await dbConnect();

  await Budget.find({
    categoryIds: categoryId,
    from: {
      $lte: date,
    },
    to: {
      $gte: date,
    },
    userId: await getUserId(),
  }).updateMany({
    $inc: {
      amount_spent: amount,
    },
  });
}

export async function createNewRecord(_: any, formData: FormData) {
  await dbConnect();

  const userId = await getUserId();
  const bankId = formData.get('account') as string;

  const bank = await BankAccount.findById(bankId);

  if (!bank) throw new Error('Bank account not found ');

  const data = getDataFromFormData(formData, bank.currency, userId);
  console.log('🚀 ~ createNewRecord ~ data:', data);

  const isValid = AddRecordSchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }

  await Movement.create(data);

  // update account balance
  await updateBalanceAccount(data.accountId, data.amount);

  await updateBudgetUsedAmount(
    data.categoryId,
    data.type as CategoryType,
    -data.amount,
    data.date,
  );

  revalidatePath('/money-track/dashboard');

  return {
    status: 'success',
  };
}
