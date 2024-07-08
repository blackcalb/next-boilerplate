'use server';

import { revalidatePath } from 'next/cache';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BillTrack from '@/models/money-track/BillTrack';

export async function copyBillsFromMonth(_: any, formData: FormData) {
  dbConnect();
  const userId = await getUserId();

  const path = formData.get('path') as string;
  const [billingYear, billingMonth] = (formData.get('billingDate') as string)
    .split('-')
    .map(Number);

  const [year, month] = (formData.get('date') as string).split('-').map(Number);
  if (!billingYear || !billingMonth || !year || !month) {
    return { status: 'error' };
  }

  const deltaMonths = (billingYear - year) * 12 + billingMonth - month;

  const bills = await BillTrack.find({
    userId,
    date: {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    },
  });

  const lastDayDate = new Date(Number(year), Number(month) + deltaMonths, 0);
  const lastDay = lastDayDate.getDate();

  const newBills = bills.map((bill) => {
    const newBill = bill.toObject();
    delete newBill._id;
    newBill.date.setMonth(newBill.date.getMonth() + deltaMonths);
    newBill.date.setDate(Math.min(newBill.date.getDate(), lastDay));
    return newBill;
  });

  await BillTrack.insertMany(newBills);

  revalidatePath(path);

  return { status: 'success' };
}
