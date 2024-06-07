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
        <div className="hidden gap-10 md:grid md:grid-cols-2 md:p-10">
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
        <div className="flex flex-col gap-10 px-2 py-4 md:hidden ">
          {incomes}
          {expenses}
          {budgets}
          {bankAccounts}
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
