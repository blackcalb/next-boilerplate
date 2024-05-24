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
      <div className="my-10 grid w-full grid-cols-1 items-stretch gap-10 px-10 lg:grid-cols-2">
        {incomes}
        {expenses}
        {budgets}
        {accounts}
      </div>
      {actions}
      {children}
      {modal}
    </main>
  );
}
