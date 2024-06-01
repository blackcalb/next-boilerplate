import { getCurrentBudgets } from '@/queries/budgets/getCurrentBudgets';
import BudgetItem from '@/ui/money-track/Budget/BusgetItem';

export default async function BudgetsPage() {
  const currentBudgets = await getCurrentBudgets();

  return (
    <div className="flex w-full flex-col gap-2">
      {currentBudgets.map((budget) => (
        <BudgetItem key={budget._id.toString()} budget={budget} />
      ))}
    </div>
  );
}
