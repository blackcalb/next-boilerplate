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
        <div className="grid grid-cols-2 gap-10 px-2 py-4 md:p-10">
          <div className="flex flex-col items-stretch justify-stretch gap-10">
            {incomes}
            {budgets}
            {billTrack}
          </div>

          <div className="flex flex-col items-stretch justify-stretch gap-10">
            {expenses}
            {bankAccounts}
            {billTrackPlanningNextMonth}
          </div>
        </div>

        {actions}

        {children}
      </div>
      {modal}
    </main>
  );
}
