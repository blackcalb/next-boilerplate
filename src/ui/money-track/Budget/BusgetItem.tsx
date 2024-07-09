import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Typography from '@/components/Typography';
import type { IBudgetFlatDocument } from '@/models/money-track/Budgets';
import { cn } from '@/utils/cn';

interface BudgetItemProps {
  budget: IBudgetFlatDocument & {
    category: { name: string }[];
  };
}

export default function BudgetItem({ budget }: Readonly<BudgetItemProps>) {
  const percentageUser = budget.amount_spent / budget.budget;
  return (
    <div
      className={cn(
        'w-full px-4 py-2',
        'border-2 border-sky-600 rounded-md',
        'bg-sky-500 text-black',
        'flex flex-col items-center',
      )}
    >
      <div className="flex w-full items-center justify-between">
        <Link href={`/money-track/budgets/${budget._id}`}>
          <Typography className="font-bold">{budget.name}</Typography>
        </Link>
        <div className="flex items-center">
          <Typography className="text-sm">
            {Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
            }).format(budget.from)}
          </Typography>
          <div>
            <FontAwesomeIcon icon={faArrowRight} className="px-2" />
          </div>
          <Typography className="text-sm">
            {Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
            }).format(budget.to)}
          </Typography>
        </div>
      </div>
      <div className="flex w-full justify-between gap-2">
        <Typography className="line-clamp-3 text-sm italic">
          {budget.category.map((category) => category.name).join(', ')}
        </Typography>
        <div>
          <Typography className=" font-bold">
            {Intl.NumberFormat('en-EU', {
              style: 'currency',
              currency: 'USD',
            }).format(budget.amount_spent)}
          </Typography>
          <Typography className="text-sm">
            {Intl.NumberFormat('en-EU', {
              style: 'currency',
              currency: 'USD',
            }).format(budget.budget)}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Typography className="text-2xl">
            {Intl.NumberFormat('en-EU', {
              style: 'percent',
            }).format(percentageUser)}
          </Typography>
          <div className="grid size-[40px] grid-cols-10 grid-rows-10 gap-0">
            {new Array(100)
              .fill(0)
              .map((_, index) => index + 1)
              .map((item) => (
                <div
                  key={item}
                  className={cn(
                    'w-1 h-1',
                    item <= percentageUser * 100
                      ? 'bg-orange-500'
                      : 'bg-green-500',
                  )}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
