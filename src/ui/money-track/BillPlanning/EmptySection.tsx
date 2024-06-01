import React from 'react';

import Typography from '@/components/Typography';

import AddNewItem from './AddNewItem';

export default function EmptySection({ month }: Readonly<{ month: number }>) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Typography className="text-2xl uppercase">No bills for</Typography>
      <Typography className="text-2xl uppercase">
        {month === 0 ? 'this' : 'next'} month found
      </Typography>
      <AddNewItem />
      <Typography>or</Typography>
      <Typography>Copy from prev month(wip)</Typography>
    </div>
  );
}
