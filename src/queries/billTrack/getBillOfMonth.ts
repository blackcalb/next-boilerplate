import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BillTrack, {
  BillTrackStatus,
  type IBillTrack,
} from '@/models/money-track/BillTrack';

// current month:0,
// next month:1,
// ...

export async function getBillOfMonth(
  deltaFromCurrentMonth: number,
): Promise<IBillTrack[]> {
  dbConnect();
  const userId = await getUserId();

  const currentMonth = new Date().getMonth();

  const bills = await BillTrack.find({
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
    userId,
    status: {
      $ne: BillTrackStatus.Deleted,
    },
  });

  return bills;
}
