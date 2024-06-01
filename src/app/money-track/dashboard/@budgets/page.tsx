import Link from 'next/link';

import BaseButton from '@/components/buttons/BaseButton';
import { getCurrentBudgets } from '@/queries/budgets/getCurrentBudgets';
import BudgetItem from '@/ui/money-track/Budget/BusgetItem';

export default async function BudgetsPage() {
  const currentBudgets = await getCurrentBudgets();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-2">
        {currentBudgets.map((budget) => (
          <BudgetItem key={budget._id.toString()} budget={budget} />
        ))}
      </div>
      <Link href="/money-track/add/budget">
        <BaseButton type="button">Add a New Budget</BaseButton>
      </Link>
    </div>
  );
}
