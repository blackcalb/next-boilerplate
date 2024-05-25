'use server';

import Prisma from '@prisma/client';
import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import { AddRecordSchema } from '@/schemas/money-track/records';
import { RecordType } from '@/types/moneyTrack';

function getDataFromFormData(
  formData: FormData,
  currency: string,
  userId: string,
) {
  const factor = formData.get('type') === RecordType.income ? 1 : -1;
  return {
    type: formData.get('type') as string,
    subject: formData.get('subject') as string,
    amount: {
      value: factor * Number(formData.get('amount')),
      currency,
    },
    accountId: formData.get('account') as string,
    categoryId: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    userId,
  };
}

async function updateBalanceAccount(bankId: string, amount: number) {
  const prisma = new Prisma.PrismaClient();

  const bank = await prisma.accounts.findUnique({
    where: { id: bankId },
  });

  if (!bank) throw new Error('Bank account not found ');

  await prisma.accounts.update({
    where: {
      id: bank.id,
    },
    data: {
      balance: bank.balance + amount,
    },
  });
}

async function updateBudgetUsedAmount(
  categoryId: string,
  transactionType: RecordType,
  amount: number,
  date: Date,
) {
  if (transactionType === RecordType.income) return;

  const prisma = new Prisma.PrismaClient();

  const budget = await prisma.budgets.findFirst({
    where: {
      categoryIds: {
        has: categoryId,
      },
      to: {
        gte: date,
      },
      from: {
        lte: date,
      },
    },
  });

  if (budget) {
    await prisma.budgets.update({
      where: {
        id: budget.id,
      },
      data: {
        used: budget.used + amount,
      },
    });
  }
}

export async function createNewRecord(_: any, formData: FormData) {
  const prisma = new Prisma.PrismaClient();

  const userId = await getUserId();

  const bank = await prisma.accounts.findUnique({
    where: { id: formData.get('account') as string },
  });

  if (!bank) throw new Error('Bank account not found ');

  const data = getDataFromFormData(formData, bank.currency, userId);

  const isValid = AddRecordSchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }

  const newRecord = await prisma.records.create({ data });

  // update account balance
  await updateBalanceAccount(data.accountId, data.amount.value);

  await updateBudgetUsedAmount(
    data.categoryId,
    data.type as RecordType,
    data.amount.value,
    data.date,
  );

  revalidatePath('/money-track/dashboard');

  return {
    data: newRecord,
  };
}
