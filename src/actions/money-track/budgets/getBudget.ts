import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Budget from '@/models/money-track/Budgets';

export default async function getBudget(budgetId: string) {
  dbConnect();

  const userId = await getUserId();

  return Budget.findOne({ _id: budgetId, userId });
}
