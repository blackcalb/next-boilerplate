'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/mongoose';
import BillTrack, { BillTrackStatus } from '@/models/money-track/BillTrack';

export async function deleteBillTrackItem(data: FormData) {
  await dbConnect();

  const id = data.get('id') as string;
  await BillTrack.findByIdAndUpdate(id, { status: BillTrackStatus.Deleted });

  revalidatePath('/money-track/dashboard');
}
