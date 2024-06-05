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
        'flex items-center gap-4',
      )}
    >
      <div className="flex-1">
        <Link href={`/money-track/budgets/${budget._id}`}>
          <Typography className="text-xl font-bold">{budget.name}</Typography>
        </Link>
        <Typography className="hidden md:inline-flex">
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(budget.from)}{' '}
          <FontAwesomeIcon icon={faArrowRight} className="px-2" />
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(budget.to)}
        </Typography>
      </div>
      <div className="flex-1">
        <Typography>
          {budget.category.map((category) => category.name).join(', ')}
        </Typography>
      </div>
      <div className="text-center">
        <Typography className="text-lg font-bold">
          {Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'USD',
          }).format(budget.amount_spent)}
        </Typography>
        <Typography>
          {Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'USD',
          }).format(budget.budget)}
        </Typography>
      </div>
      <div className="text-center">
        <Typography className="text-2xl">
          {Intl.NumberFormat('en-EU', {
            style: 'percent',
          }).format(percentageUser)}
        </Typography>
        <Typography className="text-sm"> (used)</Typography>
      </div>
      <div className="hidden sm:grid sm:grid-cols-10 sm:grid-rows-10">
        {new Array(100)
          .fill(0)
          .map((_, index) => index + 1)
          .map((item) => (
            <div
              key={item}
              className={cn(
                'w-1 h-1',
                item <= percentageUser * 100 ? 'bg-orange-500' : 'bg-green-500',
              )}
            />
          ))}
      </div>
    </div>
  );
}
