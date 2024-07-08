import React from 'react';

import Typography from '@/components/Typography';

import AddNewItem from './AddNewItem';
import { GetBillsFromPrevMonth } from './GetBillsFromPrevMonth';

interface EmptySectionProps {
  date: Date;
  monthsAvailables: { month: number; year: number }[];
}

export default function EmptySection({
  date,
  monthsAvailables,
}: Readonly<EmptySectionProps>) {
  const isCurrentMonth = date.getMonth() === new Date().getMonth();
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Typography className="text-2xl uppercase">No bills for</Typography>
      <Typography className="text-2xl uppercase">
        {isCurrentMonth ? 'this' : 'next'} month found
      </Typography>
      <AddNewItem />
      <Typography>or</Typography>
      <GetBillsFromPrevMonth
        monthsAvailables={monthsAvailables}
        billingDate={date}
      />
    </div>
  );
}
