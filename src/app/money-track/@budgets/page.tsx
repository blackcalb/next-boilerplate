import { getCurrentBudgets } from '@/queries/budgets/getCurrentBudgets';

export default async function BudgetsPage() {
  const currentBudgets = await getCurrentBudgets();

  return (
    <div className="grid grid-cols-3">
      {currentBudgets.map((budget) => (
        <div key={budget.id} className="border border-gray-200 p-4">
          <h2 className="text-lg font-semibold">{budget.name}</h2>
          <p>From: {budget.from.toString()}</p>
          <p>To: {budget.to.toString()}</p>
          <p>
            Amount: {budget.used} / {budget.budget}
          </p>
        </div>
      ))}
    </div>
  );
}
