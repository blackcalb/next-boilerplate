'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import BillTrack, { BillTrackStatus } from '@/models/money-track/BillTrack';
import Category from '@/models/money-track/Categories';

const BillTrackItemSchema = z
  .object({
    name: z.string(),
    expectedAmount: z.number(),
    date: z.date(),
    userId: z.string(),
    bankAccountId: z.string(),
    categoryId: z.string(),
    status: z.nativeEnum(BillTrackStatus),
  })
  .refine(
    async (data) => {
      const category = await Category.findOne({
        _id: data.categoryId,
        userId: data.userId,
      });

      return !!category;
    },
    {
      message: 'Category not found',
      path: ['categoryId'],
    },
  )
  .refine(
    async (data) => {
      const bankAccount = await BankAccount.findOne({
        _id: data.bankAccountId,
        userId: data.userId,
      });

      return !!bankAccount;
    },
    {
      message: 'Bank Account not found',
      path: ['bankAccountId'],
    },
  );

export async function billTrackItem(_: any, formData: FormData) {
  await dbConnect();
  const userId = await getUserId();

  const data = {
    name: formData.get('name') as string,
    status: BillTrackStatus.Pending,
    expectedAmount: Number(formData.get('expectedAmount') ?? 0),
    date: new Date(formData.get('date') as string),
    bankAccountId: formData.get('bankAccountId') as string,
    categoryId: formData.get('categoryId') as string,
    userId,
  };

  const isValid = await BillTrackItemSchema.safeParseAsync(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }

  await BillTrack.create(data);

  revalidatePath('/money-track/dashboard');

  return {
    status: 'success',
  };
}
