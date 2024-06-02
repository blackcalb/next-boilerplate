import type React from 'react';

interface BudgetsLayoutProps {
  children: React.ReactNode;
  incomes: React.ReactNode;
  expenses: React.ReactNode;
  budgets: React.ReactNode;
  actions: React.ReactNode;
  modal: React.ReactNode;
  bankAccounts: React.ReactNode;
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
  bankAccounts,
  billTrack,
  billTrackPlanningNextMonth,
}: Readonly<BudgetsLayoutProps>) {
  return (
    <main className="size-full">
      <div className="mx-auto max-w-screen-lg xl:max-w-screen-2xl">
        <div className="my-10 grid w-full grid-cols-1 items-stretch gap-10 px-10 xl:grid-cols-2">
          {incomes}
          {expenses}
          {budgets}
          {bankAccounts}
        </div>
        <div className="grid grid-cols-1 gap-8 px-12 lg:grid-cols-2">
          {billTrack}
          {billTrackPlanningNextMonth}
        </div>
        {actions}

        {children}
      </div>
      {modal}
    </main>
  );
}
