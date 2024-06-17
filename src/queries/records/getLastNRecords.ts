import mongoose from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import type { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';
import type { MovementsWithCategoryAndAccountName } from '@/ui/money-track/Movements/MovementItem';

export async function getLastNMovements(
  type: CategoryType,
  n: number = 10,
): Promise<MovementsWithCategoryAndAccountName[]> {
  await dbConnect();

  const userId = await getUserId();

  const movements = await Movement.aggregate([
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
        pipeline: [{ $project: { _id: 1, name: 1 } }],
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
        pipeline: [{ $project: { _id: 1, name: 1 } }],
        as: 'bankAccount',
      },
    },
    {
      $unwind: '$bankAccount',
    },
  ]);

  return movements.map((movement) => ({
    ...movement,
    _id: movement._id.toString(),
    category: { ...movement.category, _id: movement.category._id.toString() },
    bankAccount: {
      ...movement.bankAccount,
      _id: movement.bankAccount._id.toString(),
    },
    date: new Date(movement.date).toLocaleDateString(),
  }));
}
