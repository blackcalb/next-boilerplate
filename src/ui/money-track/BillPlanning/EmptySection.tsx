import React from 'react';

import Text from '@/components/Text';

import AddNewItem from './AddNewItem';

export default function EmptySection({ month }: Readonly<{ month: number }>) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Text className="text-2xl uppercase">No bills for</Text>
      <Text className="text-2xl uppercase">
        {month === 0 ? 'this' : 'next'} month found
      </Text>
      <AddNewItem />
      <Text>or</Text>
      <Text>Copy from prev month(wip)</Text>
    </div>
  );
}
