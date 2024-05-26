'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';

const UpdateAccountDescriptionSchema = z.object({
  accountId: z.string().length(24),
  description: z.string(),
});

export async function updateAccountDescription(_: any, formData: FormData) {
  const userId = await getUserId();

  const data = {
    description: formData.get('description') as string,
    accountId: formData.get('accountId') as string,
  };
  console.log('🚀 ~ updateAccountDescription ~ data:', data);

  const isValid = UpdateAccountDescriptionSchema.safeParse(data);

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  await dbConnect();

  await BankAccount.updateOne(
    { _id: data.accountId, userId },
    { description: data.description },
  );

  revalidatePath(`/money-track/accounts/${data.accountId}`);

  return { status: 'success' };
}
