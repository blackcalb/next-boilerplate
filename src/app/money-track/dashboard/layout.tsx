import type React from 'react';

import ContentWrapper from '@/components/surface/content-wrapper';

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
      <ContentWrapper>
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
        <div className="flex flex-col gap-4 md:hidden ">
          {incomes}
          {expenses}
          {budgets}
          {bankAccounts}
          {billTrack}
          {billTrackPlanningNextMonth}
        </div>

        {actions}

        {children}
      </ContentWrapper>
      {modal}
    </main>
  );
}
