'use server';

import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';
import Movement from '@/models/money-track/Movemets';

const UpdateBudgetCategoriesSchema = z.object({
  budgetId: z.string(),
  categories: z.array(z.string()),
  addPreviousCreatedRecordsFromAddedCategories: z.boolean(),
  removeRecordsOfEliminatedCategories: z.boolean(),
});

export async function updateBudgetCategories(_: any, formData: FormData) {
  dbConnect();

  const userId = await getUserId();

  const data = {
    path: formData.get('path') as string,
    budgetId: formData.get('budgetId') as string,
    categories: formData.getAll('category') as string[],
    addPreviousCreatedRecordsFromAddedCategories:
      formData.get('addPreviousCreatedRecordsFromAddedCategories') === 'on',
    removeRecordsOfEliminatedCategories:
      formData.get('removeRecordsOfEliminatedCategories') === 'on',
  };

  const budget = await Budget.findOne({
    _id: data.budgetId,
    userId: new ObjectId(userId),
  });

  if (!budget) {
    return { error: 'not found' };
  }

  const categoriesFromBudget = budget.categoryIds.map((cat) => cat.toString());

  const isValid = UpdateBudgetCategoriesSchema.safeParse(data);

  if (isValid.error) {
    return { errors: isValid.error.format() };
  }

  const removedCategories = categoriesFromBudget
    .filter((cat) => !data.categories.includes(cat))
    .map((cat) => new ObjectId(cat));

  let adjustment = 0;

  if (
    data.removeRecordsOfEliminatedCategories &&
    removedCategories.length > 0
  ) {
    const records = await Movement.aggregate([
      {
        $match: {
          categoryId: { $in: removedCategories },
          userId: new ObjectId(userId),
          date: { $gte: budget.from, $lte: budget.to },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    adjustment = records[0]?.total ?? 0;
  }

  const addedCategories = data.categories
    .filter((cat) => !categoriesFromBudget.includes(cat))
    .map((cat) => new ObjectId(cat));

  if (
    data.addPreviousCreatedRecordsFromAddedCategories &&
    addedCategories.length > 0
  ) {
    const records = await Movement.aggregate([
      {
        $match: {
          categoryId: { $in: addedCategories },
          userId: new ObjectId(userId),
          date: { $gte: budget.from, $lte: budget.to },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    adjustment -= records[0]?.total ?? 0;
  }

  await Budget.findOneAndUpdate(
    { _id: budget._id },
    {
      categoryIds: data.categories.map((cat) => new ObjectId(cat)),
      amount_spent: budget.amount_spent + adjustment,
    },
  );

  revalidatePath(data.path);

  return {
    status: 'success',
  };
}
