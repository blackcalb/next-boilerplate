import mongoose from 'mongoose';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BillTrack, {
  BillTrackStatus,
  type IBillTrack,
} from '@/models/money-track/BillTrack';

// current month:0,
// next month:1,
// ...

interface BillMonthWithCategory extends IBillTrack {
  category: {
    name: string;
  };
  bankAccount: {
    name: string;
  };
}

export async function getBillOfMonth(
  deltaFromCurrentMonth: number,
): Promise<BillMonthWithCategory[]> {
  dbConnect();
  const userId = await getUserId();

  const currentMonth = new Date().getMonth();

  // const bills = await BillTrack.find({
  //   date: {
  //     $gte: new Date(
  //       new Date().getFullYear(),
  //       currentMonth + deltaFromCurrentMonth,
  //       1,
  //     ),
  //     $lt: new Date(
  //       new Date().getFullYear(),
  //       currentMonth + deltaFromCurrentMonth + 1,
  //       1,
  //     ),
  //   },
  //   userId,
  //   status: {
  //     $ne: BillTrackStatus.Deleted,
  //   },
  // });

  const bills = await BillTrack.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(
            new Date().getFullYear(),
            currentMonth + deltaFromCurrentMonth,
            1,
          ),
          $lt: new Date(
            new Date().getFullYear(),
            currentMonth + deltaFromCurrentMonth + 1,
            1,
          ),
        },
        userId: new mongoose.Types.ObjectId(userId),
        status: {
          $ne: BillTrackStatus.Deleted,
        },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1, _id: 0 } }],
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $lookup: {
        from: 'bankaccounts',
        localField: 'bankAccountId',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1, _id: 0 } }],
        as: 'bankAccount',
      },
    },
    {
      $unwind: '$bankAccount',
    },
  ]);

  return bills;
}
