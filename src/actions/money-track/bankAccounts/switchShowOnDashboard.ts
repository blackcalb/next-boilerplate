'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

export default async function switchShowOnDashboard(
  _: any,
  formData: FormData,
) {
  await dbConnect();

  const userId = await getUserId();

  const data = {
    bankAccountId: formData.get('bankAccountId') as string,
    switchHideAccount: formData.get('switchHideAccount'),
  };

  if (!data.bankAccountId) {
    throw new Error('Bank account not found');
  }

  const bankAccount = await BankAccount.findById(data.bankAccountId);

  if (!bankAccount) {
    throw new Error('Bank account not found');
  }

  if (bankAccount.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await BankAccount.findByIdAndUpdate(data.bankAccountId, {
    'options.hideInDashboard': data.switchHideAccount === 'on',
  });

  revalidatePath(`/money-track/accounts/${data.bankAccountId}`);

  return {
    status: 'success',
  };
}
