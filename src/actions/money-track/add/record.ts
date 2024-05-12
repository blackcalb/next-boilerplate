import Prisma from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { RecordType } from '@/types/moneyTrack';

export async function createNewRecord(formData: FormData) {
  'use server';

  const prisma = new Prisma.PrismaClient();
  const bank = await prisma.accounts.findUnique({
    where: { id: formData.get('account') as string },
  });

  if (!bank) throw new Error('Bank account not found ');

  const type = formData.get('type') as RecordType;

  const data = {
    type: formData.get('type') as string,
    subject: formData.get('subject') as string,
    amount: {
      value: Number(formData.get('amount')),
      currency: bank.currency,
    },
    accountId: bank.id,
    categoryId: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
  };

  await prisma.records.create({ data });

  // if (type === RecordType.income) {
  // update account balance
  const factor = type === RecordType.income ? 1 : -1;
  await prisma.accounts.update({
    where: {
      id: bank.id,
    },
    data: {
      balance: bank.balance + factor * Number(formData.get('amount')),
    },
  });
  // }

  // update budget balance
  if (type === RecordType.expense) {
    const budget = await prisma.budgets.findFirst({
      where: {
        categoryIds: {
          has: formData.get('category') as string,
        },
        to: {
          gte: new Date(formData.get('date') as string),
        },
        from: {
          lte: new Date(formData.get('date') as string),
        },
      },
    });

    if (budget) {
      await prisma.budgets.update({
        where: {
          id: budget.id,
        },
        data: {
          used: budget.used + Number(formData.get('amount')),
        },
      });
    }
  }

  revalidatePath('/money-track');

  redirect('/money-track');
}
