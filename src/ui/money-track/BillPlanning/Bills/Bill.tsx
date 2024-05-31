/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import Text from '@/components/Text';
import type { IBillTrackClient } from '@/models/money-track/BillTrack';
import { cn } from '@/utils/cn';

import { DeleteBillButton } from '../DeleteBillButton';
import { PayButtonPendingBills } from './PayPendingBillsButton';

interface PendingItemProps {
  bill: IBillTrackClient;
  pendingMode?: boolean;
}

export function PendingItem({
  bill,
  pendingMode = false,
}: Readonly<PendingItemProps>) {
  return (
    <div
      className={cn(
        'w-full px-4 py-2',
        'rounded-lg border-2 border-lime-500',
        'flex gap-4',
        'bg-lime-400',
      )}
    >
      <div className="grid w-full grid-cols-[1fr_32px_32px] items-center gap-x-6">
        <div
          className={cn(
            'flex items-center justify-between',
            !pendingMode && 'col-span-3',
          )}
        >
          <div className="flex flex-col justify-between">
            <Text className="text-lg font-semibold">{bill.name}</Text>
            <div className="flex gap-4">
              <Text className="italic ">
                {Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(bill.date))}
              </Text>
              <Text className="italic">account name</Text>
            </div>
          </div>
          <div>
            {bill.finalAmount && (
              <Text>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: bill.currency,
                }).format(bill.finalAmount)}
              </Text>
            )}
            <Text className={cn(bill.finalAmount && 'line-through')}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: bill.currency,
              }).format(bill.expectedAmount)}
            </Text>
          </div>
        </div>
        {pendingMode && (
          <PayButtonPendingBills
            id={bill._id}
            defaultAmount={bill.expectedAmount}
          />
        )}
        {pendingMode && <DeleteBillButton id={bill._id} />}
      </div>
    </div>
  );
}
