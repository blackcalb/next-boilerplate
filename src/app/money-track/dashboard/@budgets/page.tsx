import Link from 'next/link';

import BaseButton from '@/components/buttons/BaseButton';
import { getCurrentBudgets } from '@/queries/budgets/getCurrentBudgets';

export default async function BudgetsPage() {
  const currentBudgets = await getCurrentBudgets();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between">
      <div className="grid grid-cols-3">
        {currentBudgets.map((budget) => (
          <div
            key={budget._id.toString()}
            className="border border-gray-200 p-4"
          >
            <h2 className="text-lg font-semibold">{budget.name}</h2>
            <p>From: {budget.from.toString()}</p>
            <p>To: {budget.to.toString()}</p>
            <p>
              Amount: {budget.amount_spent} / {budget.budget}
            </p>
          </div>
        ))}
      </div>
      <Link href="/money-track/add/budget">
        <BaseButton type="button">Add a New Budget</BaseButton>
      </Link>
    </div>
  );
}
