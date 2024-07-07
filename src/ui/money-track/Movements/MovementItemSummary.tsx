'use client';

import Typography from '@/components/Typography';
import { cn } from '@/utils/cn';

export interface MovementsWithCategoryAndAccountName {
  _id: string;
  category: { _id: string; name: string };
  bankAccount: { _id: string; name: string };
  type: string;
  name: string;
  date: string;
  currency: string;
  amount: number;
}

function getBackgroundColor(type: string) {
  switch (type) {
    case 'income':
      return 'bg-green-400';
    case 'expense':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
}

function getBorderColor(type: string) {
  switch (type) {
    case 'income':
      return 'border-green-600';
    case 'expense':
      return 'border-red-600';
    default:
      return 'border-gray-600';
  }
}

type MovementItemProps<T extends MovementsWithCategoryAndAccountName> = {
  movement: T;
};

export default function MovementItemSummary<
  T extends MovementsWithCategoryAndAccountName,
>({ movement }: Readonly<MovementItemProps<T>>) {
  return (
    <div
      className={cn(
        'w-full',
        'grid gap-2 items-center',
        'grid-cols-5',
        'rounded-md border-2',
        getBorderColor(movement.type),
        getBackgroundColor(movement.type),
        'text-black',
        'px-4 py-2',
      )}
    >
      <div className="col-span-2">
        <Typography className="font-bold">{movement.name}</Typography>
        <Typography variant="p" className="text-sm">
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(new Date(movement.date))}
        </Typography>
      </div>
      <div className="col-span-2">
        <Typography className="text-sm italic">
          {movement.bankAccount.name}
        </Typography>
        <Typography className="text-sm italic">
          {movement.category.name}
        </Typography>
      </div>
      <div className="flex justify-end">
        <Typography className="font-bold">
          {Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: movement.currency,
          }).format(Math.abs(movement.amount))}
        </Typography>
      </div>
    </div>
  );
}
