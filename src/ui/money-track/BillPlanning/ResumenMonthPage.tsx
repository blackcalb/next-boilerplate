import Typography from '@/components/Typography';
import { BillTrackStatus } from '@/models/money-track/BillTrack';
import { getBillOfMonth } from '@/queries/billTrack/getBillOfMonth';
import { cn } from '@/utils/cn';
import mapDocumentToClient from '@/utils/mapDocumentToClient';

import AddNewItem from './AddNewItem';
import PendingBills from './Bills';
import EmptySection from './EmptySection';

export default async function ResumenMonthPage({
  month,
}: Readonly<{ month: number }>) {
  const bills = await getBillOfMonth(month);
  const pendingBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Pending)
    .map(mapDocumentToClient);

  const hasPendingBills = pendingBills.length > 0;

  const paidBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Paid)
    .map(mapDocumentToClient);

  if (!bills || bills.length === 0) {
    return <EmptySection month={month} />;
  }

  const hasPaidBills = paidBills.length > 0;

  const totalExpectedAmount = bills.reduce(
    (acc, bill) => acc + bill.expectedAmount,
    0,
  );
  const paidAmount = paidBills.reduce((acc, bill) => acc + bill.finalAmount, 0);
  const pendingAmount = pendingBills.reduce(
    (acc, bill) =>
      acc + (bill.status === BillTrackStatus.Pending ? bill.expectedAmount : 0),
    0,
  );
  const surplus = paidBills.reduce(
    (acc, bill) => acc + bill.expectedAmount - bill.finalAmount,
    0,
  );

  const base = Math.max(totalExpectedAmount, paidAmount + pendingAmount);

  const totalExpectedPercetage = Math.round((100 * totalExpectedAmount) / base);
  const paidPercentage = Math.round((100 * paidAmount) / base);
  const pendingPercentage = Math.round((100 * pendingAmount) / base);
  const surplusPercentage = Math.round((100 * surplus) / base);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography className="text-center text-3xl">Resume</Typography>
        <div className="flex flex-col justify-stretch gap-2 px-12">
          <div className="flex overflow-hidden rounded-md">
            <div
              className="h-4 bg-blue-300"
              style={{
                width: `${totalExpectedPercetage}%`,
              }}
            />
            {surplus < 0 ? (
              <div
                className="h-4 bg-red-500"
                style={{ width: `${-surplusPercentage}%` }}
              />
            ) : null}
          </div>
          <div className="flex overflow-hidden rounded-md">
            <div
              className="h-4 bg-sky-300"
              style={{
                width: `${paidPercentage}%`,
              }}
            />
            <div
              className="h-4 bg-orange-300"
              style={{
                width: `${pendingPercentage}%`,
              }}
            />
            {surplus > 0 ? (
              <div
                className="h-4 bg-lime-300"
                style={{
                  width: `${surplusPercentage}%`,
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center justify-end gap-4">
            <Typography>
              Total expected amount: {totalExpectedAmount}
            </Typography>
            <div className="size-4 bg-blue-300" />
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-sky-300" />
            <Typography>Paid amount: {paidAmount}</Typography>
          </div>
          <div className="flex items-center justify-end gap-2 text-right">
            <Typography>Pending amount: {pendingAmount}</Typography>
            <div className="size-4 bg-orange-300" />
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'size-4',
                surplus >= 0 && 'bg-lime-300',
                surplus < 0 && 'bg-red-500',
              )}
            />
            <Typography>Surplus: {surplus}</Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {hasPendingBills && <PendingBills bills={pendingBills} pendingMode />}
        {hasPaidBills && <PendingBills bills={paidBills} />}

        <AddNewItem />
      </div>
    </div>
  );
}
