import type { NextRequest } from 'next/server';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

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

  // valid params
  const { searchParams } = req.nextUrl;
  // 0=current month, N=last n-1 months
  const period = Number(searchParams.get('period'));

  if (Number.isNaN(period)) {
    return new Response(JSON.stringify({ message: 'Invalid period' }), {
      status: 400,
    });
  }

  await dbConnect();
  const account = await BankAccount.findById(params.accountId);

  if (!account) {
    return new Response(JSON.stringify({ message: 'Account not found' }), {
      status: 404,
    });
  }

  if (account.userId.toString() !== userId) {
    return new Response(JSON.stringify({ message: 'Forbidden' }), {
      status: 403,
    });
  }

  await BankAccount.create({
    name: 'My Account',
    balance: 0,
    currency: 'USD',
    userId,
  });
  const banks = await BankAccount.find({ userId });
  console.log('🚀 ~ banks:', banks);

  // get all records from the account from first day of the month until last day of the month
  // const now = new Date();
  // const start = new Date(now.getFullYear(), now.getMonth(), 1);
  // const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // // query from records where date is between start and end and agrupate by type

  // console.log('🚀 ~ movements:', movements);

  return new Response(
    JSON.stringify({ message: `Hello from Next.js! ${userId}` }),
    {
      status: 200,
    },
  );
}
