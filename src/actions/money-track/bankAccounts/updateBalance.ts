import type { ObjectId } from 'mongoose';

import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

export async function updateBalanceAccount(
  bankId: string | ObjectId,
  amount: number,
) {
  await dbConnect();

  const bank = await BankAccount.findById(bankId);

  if (!bank) throw new Error('Bank account not found ');

  await BankAccount.findByIdAndUpdate(bankId, {
    balance: bank.balance + amount,
  });
}
