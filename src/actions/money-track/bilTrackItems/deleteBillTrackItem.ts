'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/mongoose';
import BillTrack, { BillTrackStatus } from '@/models/money-track/BillTrack';

export async function deleteBillTrackItem(id: string) {
  await dbConnect();

  await BillTrack.findByIdAndUpdate(id, { status: BillTrackStatus.Deleted });

  revalidatePath('/money-track/dashboard');
}
