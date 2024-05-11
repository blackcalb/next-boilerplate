import type React from 'react';

interface BudgetsLayoutProps {
  children: React.ReactNode;
  incomes: React.ReactNode;
  expenses: React.ReactNode;
  budgets: React.ReactNode;
}

export default function BudgetsLayout({
  children,
  incomes,
  expenses,
  budgets,
}: Readonly<BudgetsLayoutProps>) {
  return (
    <main className="size-full">
      <div className="grid w-full grid-cols-2 items-stretch gap-10 px-10">
        {incomes}
        {expenses}
        <div className="col-span-2">{budgets}</div>
      </div>
      {children}
    </main>
  );
}
