'use client';

import React, { useState } from 'react';

import Select from '@/components/inputs/select';
import useGetMovements from '@/hooks/money-track/movements/useGetMovements';
import type { CategoryType } from '@/models/money-track/Categories';
import type { Option } from '@/types/moneyTrack';

import MovementItem from './MovementItem';

interface MovementListProps {
  type: CategoryType;
  categoriesOptions: Option[];
  bankAccountOptions: Option[];
}

export const MovementList = ({
  type,
  categoriesOptions,
  bankAccountOptions,
}: Readonly<MovementListProps>) => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const { data, refetch } = useGetMovements(type, selectedPeriod);

  return (
    <div>
      <div className="mt-10 w-1/3">
        <Select
          options={[
            { label: 'Current month', value: 0 },
            { label: 'Last two month', value: 1 },
            { label: 'Last three month', value: 2 },
          ]}
          label="Select period"
          name="period"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(+e.target.value)}
        />
      </div>
      <div className="mt-10 flex flex-col gap-2 px-10">
        {data?.map((movement) => (
          <MovementItem
            key={movement._id.toString()}
            movement={movement}
            allowEdit
            bankAccountOptions={bankAccountOptions}
            categoriesOptions={categoriesOptions}
            path="/money-track/expenses"
            refetch={() => refetch()}
          />
        ))}
      </div>
    </div>
  );
};
