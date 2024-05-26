import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';

export async function getCurrentBudgets() {
  await dbConnect();
  const userId = await getUserId();

  return Budget.find(
    {
      from: {
        $lte: new Date(),
      },
      to: {
        $gte: new Date(),
      },
      userId,
    },
    null,
    {
      sort: {
        from: -1,
      },
      lean: true,
    },
  );
}
