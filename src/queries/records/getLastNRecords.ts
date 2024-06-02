import type { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import type { CategoryType } from '@/models/money-track/Categories';
import Movement, { type IMovement } from '@/models/money-track/Movemets';

interface MovementsWithCategoryAndAccountName extends IMovement {
  _id: ObjectId;
  category: { name: string };
  bankAccount: { name: string };
}

export async function getLastNMovements(
  type: CategoryType,
  n: number = 10,
): Promise<MovementsWithCategoryAndAccountName[]> {
  await dbConnect();

  const userId = await getUserId();

  return Movement.aggregate([
    {
      $match: {
        type,
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: { date: -1 },
    },
    {
      $limit: n,
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 0, name: 1 } }],
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $lookup: {
        from: 'bankaccounts',
        localField: 'bankAccountId',
        foreignField: '_id',
        pipeline: [{ $project: { _id: 0, name: 1 } }],
        as: 'bankAccount',
      },
    },
    {
      $unwind: '$bankAccount',
    },
  ]);
}
