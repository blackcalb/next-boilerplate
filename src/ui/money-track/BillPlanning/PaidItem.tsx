import type { IBillTrackFlatDocument } from '@/models/money-track/BillTrack';

export function PaidItem({ bill }: Readonly<{ bill: IBillTrackFlatDocument }>) {
  const id = bill._id.toString();

  return (
    <tr key={id}>
      <td>{bill.name}</td>
      <td>{bill.expectedAmount}</td>
      <td>{bill.finalAmount}</td>
    </tr>
  );
}
