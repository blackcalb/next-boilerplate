import mongoose from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';

export async function getCurrentBudgets() {
  await dbConnect();
  const userId = await getUserId();

  return Budget.aggregate([
    {
      $match: {
        from: {
          $lte: new Date(),
        },
        to: {
          $gte: new Date(),
        },
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryIds',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1, _id: 0 } }],
        as: 'category',
      },
    },
  ]);
}
