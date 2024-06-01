/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import Typography from '@/components/Typography';
import {
  BillTrackStatus,
  type IBillTrackClient,
} from '@/models/money-track/BillTrack';
import { cn } from '@/utils/cn';

import { DeleteBillButton } from '../DeleteBillButton';
import { PayButtonPendingBills } from './PayPendingBillsButton';

interface PendingItemProps {
  bill: IBillTrackClient & {
    category: {
      name: string;
    };
    bankAccount: {
      name: string;
    };
  };
}

export function PendingItem({ bill }: Readonly<PendingItemProps>) {
  // variable that show if bill.date and today have less than 2 day of difference
  const isPending = BillTrackStatus.Pending === bill.status;
  const isPaid = BillTrackStatus.Paid === bill.status;
  const isNear =
    new Date(bill.date).getTime() - new Date().getTime() <
    2 * 24 * 60 * 60 * 1000;

  const isLate = new Date(bill.date).getTime() < new Date().getTime();

  return (
    <div
      className={cn(
        isPending && {
          'border-sky-600 bg-sky-400': !isNear && !isLate,
          'border-amber-600 bg-amber-400': isNear,
          'border-orange-600 bg-orange-400': isLate,
        },
        isPaid && 'border-lime-600 bg-lime-400',
        'w-full px-4 py-2',
        'rounded-lg border-2',
        'flex gap-4',
        'text-black',
      )}
    >
      <div className="grid w-full grid-cols-[1fr_32px_50px] items-center gap-x-6">
        <div
          className={cn(
            'flex items-center justify-between',
            !isPending && 'col-span-4',
          )}
        >
          <div className="flex flex-col justify-between">
            <Typography className="text-lg font-semibold">
              {bill.name}
            </Typography>
            <div className="flex gap-4">
              <Typography className="italic ">
                {Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(bill.date))}
              </Typography>
              <Typography className="italic">
                {bill.category.name} - {bill.bankAccount.name}
              </Typography>
            </div>
          </div>
          <div>
            {bill.finalAmount && (
              <Typography>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: bill.currency,
                }).format(bill.finalAmount)}
              </Typography>
            )}
            <Typography className={cn(bill.finalAmount && 'line-through')}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: bill.currency,
              }).format(bill.expectedAmount)}
            </Typography>
          </div>
        </div>
        {isPending && (
          <PayButtonPendingBills
            id={bill._id}
            defaultAmount={bill.expectedAmount}
          />
        )}
        {isPending && <DeleteBillButton id={bill._id} />}
      </div>
    </div>
  );
}
