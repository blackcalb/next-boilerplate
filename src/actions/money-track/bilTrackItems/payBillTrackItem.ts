'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import dbConnect from '@/lib/mongoose';
import BillTrack, { BillTrackStatus } from '@/models/money-track/BillTrack';
import { CategoryType } from '@/models/money-track/Categories';

import createMovement from '../movemets/createMovement';

const payBillTrackItemSchema = z.object({
  id: z.string(),
  amount: z.number(),
});

export async function payBillTrackItem(_: any, formData: FormData) {
  await dbConnect();

  const data = {
    id: formData.get('id') as string,
    amount: Number(formData.get('amount') ?? 0),
  };

  const isValid = payBillTrackItemSchema.safeParse(data);

  if (isValid.error) {
    return {
      errors: isValid.error.format(),
    };
  }

  const currentBill = await BillTrack.findById(data.id);

  if (!currentBill) {
    return {
      error: 'Not found',
    };
  }
  // TODO: extract this to a function nad update places, because here we are leveaing budgets out
  await createMovement(
    {
      bankAccountId: currentBill.bankAccountId,
      categoryId: currentBill.categoryId,
      date: new Date(),
      name: `Payment for ${currentBill.name}`,
      amount: -data.amount,
      currency: 'EUR',
      type: CategoryType.Expense,
      userId: currentBill.userId,
    },
    {
      updateAccountBalance: true,
      updateBudgets: true,
    },
  );

  await BillTrack.findByIdAndUpdate(data.id, {
    status: BillTrackStatus.Paid,
    finalAmount: data.amount,
  });

  revalidatePath('/money-track/dashboard');

  return {
    status: 'success',
  };
}
