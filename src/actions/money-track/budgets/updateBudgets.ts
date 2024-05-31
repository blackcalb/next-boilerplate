import type { ObjectId } from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';
import { CategoryType } from '@/models/money-track/Categories';

export default async function updateBudgetUsedAmount(
  categoryId: string | ObjectId,
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
