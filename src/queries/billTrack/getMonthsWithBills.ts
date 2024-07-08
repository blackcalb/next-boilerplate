import mongoose from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BillTrack from '@/models/money-track/BillTrack';

export async function getMonthsWithBills() {
  dbConnect();

  const userId = await getUserId();

  const months = await BillTrack.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        status: { $ne: 'deleted' },
      },
    },
    {
      $project: {
        month: { $month: '$date' },
        year: { $year: '$date' },
      },
    },
    {
      $group: {
        _id: { month: '$month', year: '$year' },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id.month',
        year: '$_id.year',
      },
    },
    {
      $sort: {
        year: -1,
        month: -1,
      },
    },
  ]);

  return months.map(({ month, year }) => ({ month, year }));
}
