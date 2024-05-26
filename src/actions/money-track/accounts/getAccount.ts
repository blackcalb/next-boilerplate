import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

export default async function getAccount(id: string) {
  await dbConnect();
  const userId = await getUserId();

  return BankAccount.findOne({ _id: id, userId }, undefined, { lean: true });
}
