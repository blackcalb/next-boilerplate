import type { ObjectId } from 'mongoose';

import Typography from '@/components/Typography';
import type { IMovement } from '@/models/money-track/Movemets';
import { cn } from '@/utils/cn';

interface MovementsWithCategoryAndAccountName extends IMovement {
  _id: ObjectId;
  category: { name: string };
  bankAccount: { name: string };
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

export default function MovementItem({
  movement,
}: {
  movement: MovementsWithCategoryAndAccountName;
}) {
  return (
    <div
      className={cn(
        'w-full',
        'flex items-center gap-2',
        'rounded-md border-2',
        getBorderColor(movement.type),
        getBackgroundColor(movement.type),
        'text-black',
        'px-4 py-2',
      )}
    >
      <div className="flex-1">
        <Typography className="text-xl font-bold">{movement.name}</Typography>
        <Typography variant="p">
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(movement.date)}
        </Typography>
      </div>
      <div className="flex-1">
        <Typography className="italic">{movement.bankAccount.name}</Typography>
        <Typography className="italic">{movement.category.name}</Typography>
      </div>
      <Typography className="text-lg font-bold">
        {Intl.NumberFormat('en-EU', {
          style: 'currency',
          currency: movement.currency,
        }).format(movement.amount)}
      </Typography>
    </div>
  );
}
