'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';
import { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';
import { AddBudgetSchema } from '@/schemas/money-track/budget';

export async function createNewBudget(_: any, formData: FormData) {
  const userId = await getUserId();

  const data = {
    name: formData.get('name') as string,
    from: new Date(formData.get('from') as string),
    to: new Date(formData.get('to') as string),
    categoryIds: (formData.getAll('category') as string[]) ?? [],
    budget: Number(formData.get('budget')),
    amount_spent: 0,
    userId,
  };

  const isValid = AddBudgetSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  const addPreviousCreatedRecords = formData.get('addPreviousCreatedRecords');

  await dbConnect();
  if (addPreviousCreatedRecords) {
    const records = await Movement.find({
      categoryId: {
        $in: data.categoryIds,
      },
      date: {
        $gte: data.from,
        $lte: data.to,
      },
      userId,
      type: CategoryType.Expense,
    });

    data.amount_spent = records.reduce((acc, record) => acc - record.amount, 0);
  }

  await Budget.create(data);

  revalidatePath('/money-track/dashboard');

  return { status: 'success' };
}
