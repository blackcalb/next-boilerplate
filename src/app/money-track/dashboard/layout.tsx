import type React from 'react';

interface BudgetsLayoutProps {
  children: React.ReactNode;
  incomes: React.ReactNode;
  expenses: React.ReactNode;
  budgets: React.ReactNode;
  actions: React.ReactNode;
  modal: React.ReactNode;
  accounts: React.ReactNode;
  billTrack: React.ReactNode;
  billTrackPlanningNextMonth: React.ReactNode;
}

export default function BudgetsLayout({
  children,
  incomes,
  expenses,
  budgets,
  actions,
  modal,
  accounts,
  billTrack,
  billTrackPlanningNextMonth,
}: Readonly<BudgetsLayoutProps>) {
  return (
    <main className="size-full">
      {actions}
      <div className="my-10 grid w-full grid-cols-1 items-stretch gap-10 px-10 lg:grid-cols-2">
        {incomes}
        {expenses}
        {budgets}
        {accounts}
      </div>
      <div className="grid grid-cols-3 gap-8 px-12">
        {billTrack}
        {billTrackPlanningNextMonth}
      </div>

      {children}
      {modal}
    </main>
  );
}
