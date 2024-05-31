import Text from '@/components/Text';
import { BillTrackStatus } from '@/models/money-track/BillTrack';
import { getBillOfMonth } from '@/queries/billTrack/getBillOfMonth';
import AddNewItem from '@/ui/money-track/BillPlanning/AddNewItem';
import PendingBills from '@/ui/money-track/BillPlanning/Bills';
import EmptySection from '@/ui/money-track/BillPlanning/EmptySection';
import { cn } from '@/utils/cn';
import mapDocumentToClient from '@/utils/mapDocumentToClient';

export default async function billTrackPlanningNextMonth() {
  const bills = await getBillOfMonth(1);
  const pendingBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Pending)
    .map(mapDocumentToClient);

  const hasPendingBills = pendingBills.length > 0;

  const paidBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Paid)
    .map(mapDocumentToClient);

  if (!bills || bills.length === 0) {
    return <EmptySection month={1} />;
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
        <Text className="text-center text-3xl">Resume</Text>
        <div className="flex flex-col justify-stretch gap-2 px-12">
          <div
            className="h-4 bg-blue-300"
            style={{
              width: `${totalExpectedPercetage}%`,
            }}
          />
          <div className="flex">
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

          {surplus < 0 ? (
            <div className="flex justify-end">
              <div
                className="h-4 bg-red-500"
                style={{ width: `${-surplusPercentage}%` }}
              />
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center justify-end gap-4">
            <Text>Total expected amount: {totalExpectedAmount}</Text>
            <div className="size-4 bg-blue-300" />
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-sky-300" />
            <Text>Paid amount: {paidAmount}</Text>
          </div>
          <div className="flex items-center justify-end gap-2 text-right">
            <Text>Pending amount: {pendingAmount}</Text>
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
            <Text>Surplus: {surplus}</Text>
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