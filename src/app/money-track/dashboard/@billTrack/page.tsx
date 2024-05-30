import Text from '@/components/Text';
import { BillTrackStatus } from '@/models/money-track/BillTrack';
import { getBillOfMonth } from '@/queries/billTrack/getBillOfMonth';
import AddNewItem from '@/ui/money-track/BillPlanning/AddNewItem';
import EmptySection from '@/ui/money-track/BillPlanning/EmptySection';
import { PaidItem } from '@/ui/money-track/BillPlanning/PaidItem';
import { PendingItem } from '@/ui/money-track/BillPlanning/PendingItem';
import mapDocumentToClient from '@/utils/mapDocumentToClient';

export default async function BillTrackPage() {
  const bills = await getBillOfMonth(0);

  if (!bills || bills.length === 0) {
    return <EmptySection month={0} />;
  }

  return (
    <div>
      <Text> Track yoru bills</Text>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E Amount</th>
            <th>Date</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {bills
            .filter((bill) => bill.status === BillTrackStatus.Pending)
            .map(mapDocumentToClient)
            .map((bill) => (
              <PendingItem key={bill._id} bill={bill} />
            ))}
        </tbody>
      </table>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E Amount</th>
            <th>P Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills
            .filter((bill) => bill.status === BillTrackStatus.Paid)
            .map(mapDocumentToClient)
            .map((bill) => (
              <PaidItem key={bill._id} bill={bill} />
            ))}
        </tbody>
      </table>

      <AddNewItem />
    </div>
  );
}
