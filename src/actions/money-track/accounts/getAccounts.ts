import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

export default async function getAccounts(
  options: {
    showAll?: boolean;
  } = {
    showAll: true,
  },
) {
  await dbConnect();
  const userId = await getUserId();

  if (options.showAll) {
    return BankAccount.find({ userId }, undefined, { lean: true });
  }

  return BankAccount.find(
    {
      userId,
      $or: [
        { 'options.hideInDashboard': { $exists: false } },
        { 'options.hideInDashboard': false },
      ],
    },
    undefined,
    { lean: true },
  );
}
