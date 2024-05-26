import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

export default async function getAccounts() {
  await dbConnect();
  const userId = await getUserId();

  return BankAccount.find({ userId }, undefined, { lean: true });
}
