import React from 'react';

import Text from '@/components/Text';
import { type IBillTrackClient } from '@/models/money-track/BillTrack';

import { PendingItem } from './Bill';

interface PendingBillsProps {
  bills: IBillTrackClient[];
  pendingMode?: boolean;
}

export function PendingBills({
  bills,
  pendingMode,
}: Readonly<PendingBillsProps>) {
  return (
    <div className="flex flex-col gap-6">
      <Text className="text-center text-2xl">
        {pendingMode ? 'Pending Bills' : 'Paid Bills'}
      </Text>
      <div className="flex flex-col gap-2">
        {bills.map((bill) => (
          <PendingItem key={bill._id} bill={bill} pendingMode={pendingMode} />
        ))}
      </div>
    </div>
  );
}
