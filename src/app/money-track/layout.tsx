import type React from 'react';

interface BudgetsLayoutProps {
  children: React.ReactNode;
  incomes: React.ReactNode;
  expenses: React.ReactNode;
  budgets: React.ReactNode;
  actions: React.ReactNode;
  modal: React.ReactNode;
  accounts: React.ReactNode;
}

export default function BudgetsLayout({
  children,
  incomes,
  expenses,
  budgets,
  actions,
  modal,
  accounts,
}: Readonly<BudgetsLayoutProps>) {
  return (
    <main className="size-full">
      {actions}
      <div className="grid w-full grid-cols-2 items-stretch gap-10 px-10">
        {incomes}
        {expenses}
        {budgets}
        {accounts}
      </div>
      {children}
      {modal}
    </main>
  );
}
