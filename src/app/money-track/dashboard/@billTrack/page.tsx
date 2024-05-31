import { BillTrackStatus } from '@/models/money-track/BillTrack';
import { getBillOfMonth } from '@/queries/billTrack/getBillOfMonth';
import AddNewItem from '@/ui/money-track/BillPlanning/AddNewItem';
import PendingBills from '@/ui/money-track/BillPlanning/Bills';
import EmptySection from '@/ui/money-track/BillPlanning/EmptySection';
import mapDocumentToClient from '@/utils/mapDocumentToClient';

export default async function BillTrackPage() {
  const bills = await getBillOfMonth(0);
  const pendingBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Pending)
    .map(mapDocumentToClient);

  const hasPendingBills = pendingBills.length > 0;

  const paidBills = bills
    .filter((bill) => bill.status === BillTrackStatus.Paid)
    .map(mapDocumentToClient);

  if (!bills || bills.length === 0) {
    return <EmptySection month={0} />;
  }

  const hasPaidBills = paidBills.length > 0;

  return (
    <div className="flex flex-col gap-10">
      {hasPendingBills && <PendingBills bills={pendingBills} pendingMode />}
      {hasPaidBills && <PendingBills bills={paidBills} />}

      <AddNewItem />
    </div>
  );
}
