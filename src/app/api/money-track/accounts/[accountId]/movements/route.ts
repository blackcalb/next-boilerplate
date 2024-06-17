import { type NextRequest, NextResponse } from 'next/server';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import type { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } },
) {
  const userId = await getUserId();

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { searchParams } = req.nextUrl;
  // 0=current month, N=last n-1 months
  const period = Number(searchParams.get('period'));

  if (Number.isNaN(period)) {
    return new Response(JSON.stringify({ message: 'Invalid period' }), {
      status: 400,
    });
  }

  await dbConnect();
  const bankAccount = await BankAccount.findById(params.accountId);

  if (!bankAccount) {
    return new Response(JSON.stringify({ message: 'Account not found' }), {
      status: 404,
    });
  }

  if (bankAccount.userId.toString() !== userId) {
    return new Response(JSON.stringify({ message: 'Forbidden' }), {
      status: 403,
    });
  }

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - period, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const movements: {
    _id: {
      month: number;
      year: number;
      type: CategoryType;
    };
    total: number;
  }[] = await Movement.aggregate([
    {
      $match: {
        accountId: bankAccount._id,
        date: { $gte: start, $lte: end },
      },
    },
    {
      $project: {
        month: { $month: '$date' },
        year: { $year: '$date' },
        type: 1,
        amount: 1,
      },
    },
    {
      $group: {
        _id: { month: '$month', year: '$year', type: '$type' },
        total: { $sum: { $abs: '$amount' } },
      },
    },
  ]);

  const response = movements
    .map((item) => ({
      name: `${item._id.year}-${item._id.month}`,
      [item._id.type]: item.total,
    }))
    .reduce(
      (acc, curr) => {
        if (acc.find((item) => item.name === curr.name)) {
          return acc.map((item) =>
            item.name === curr.name ? { ...item, ...curr } : item,
          );
        }
        return [...acc, curr];
      },
      [] as ({ name: string } & Partial<Record<CategoryType, number>>)[],
    );

  response.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(response);
}
