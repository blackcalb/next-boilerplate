'use server';

import Prisma from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { AddBudgetSchema } from '@/schemas/money-track/budget';

export async function createNewBudget(_: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    from: new Date(formData.get('from') as string),
    to: new Date(formData.get('to') as string),
    categoryIds: (formData.getAll('category') as string[]) ?? [],
    budget: Number(formData.get('budget')),
    used: 0,
  };

  const isValid = AddBudgetSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  const prisma = new Prisma.PrismaClient();

  const addPreviousCreatedRecords = formData.get('addPreviousCreatedRecords');

  if (addPreviousCreatedRecords) {
    // find all  records that match the categoryids and where done between the from and to dates
    const records = await prisma.records.findMany({
      where: {
        categoryId: {
          in: data.categoryIds,
        },
        date: {
          gte: data.from,
          lte: data.to,
        },
      },
    });

    data.used = records.reduce((acc, record) => acc + record.amount.value, 0);
  }

  const newBudget = await prisma.budgets.create({ data });

  revalidatePath('/money-track');

  return { data: newBudget };
}
