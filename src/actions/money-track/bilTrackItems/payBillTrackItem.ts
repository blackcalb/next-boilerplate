'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import dbConnect from '@/lib/mongoose';
import BillTrack, { BillTrackStatus } from '@/models/money-track/BillTrack';
import { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';

const payBillTrackItemSchema = z.object({
  id: z.string(),
  bankAccountId: z.string(),
  amount: z.number(),
});

export async function payBillTrackItem(_: any, formData: FormData) {
  await dbConnect();

  const data = {
    id: formData.get('id') as string,
    bankAccountId: formData.get('bankAccountId') as string,
    amount: Number(formData.get('amount') ?? 0),
  };

  const isValid = payBillTrackItemSchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }

  const currentBill = await BillTrack.findById(data.id);

  if (!currentBill) {
    return {
      error: 'Not found',
    };
  }

  await Movement.create({
    accountId: data.bankAccountId,
    date: new Date(),
    name: `Payment for ${currentBill.name}`,
    amount: data.amount,
    currency: 'EUR',
    type: CategoryType.Expense,
    billTrackId: data.id,
    userId: currentBill.userId,
  });

  await BillTrack.findByIdAndUpdate(data.id, {
    status: BillTrackStatus.Paid,
    finalAmount: data.amount,
  });

  revalidatePath('/money-track/dashboard');

  return {
    status: 'success',
  };
}
