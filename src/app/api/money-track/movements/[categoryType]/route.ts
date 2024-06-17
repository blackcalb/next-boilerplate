import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Movement from '@/models/money-track/Movemets';

const DEFAULT_PERIOD = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryType: string } },
) {
  const userId = await getUserId();

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { searchParams } = req.nextUrl;
  // 0=current month, N=last n-1 months
  const period = Number(searchParams.get('period') ?? DEFAULT_PERIOD);

  if (Number.isNaN(period)) {
    return new Response(JSON.stringify({ message: 'Invalid period' }), {
      status: 400,
    });
  }

  await dbConnect();

  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - period,
    1,
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const movements = await Movement.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: params.categoryType,
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $sort: { date: -1 },
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

  return NextResponse.json(movements);
}
