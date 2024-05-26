'use client';

import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import Select from '@/components/inputs/select';
import useGetAccountMovements from '@/hooks/money-track/accounts/useGetAccountMovements';

interface AccountSummaryProps {
  accountId: string;
}

export function AccountSummary({ accountId }: Readonly<AccountSummaryProps>) {
  const [selectedView, setSelectedView] = useState(0);
  const { data, isLoading, isError } = useGetAccountMovements(
    accountId,
    selectedView,
  );
  console.log('🚀 ~ AccountSummary ~ data:', data, isError, isLoading);

  return (
    <div className="mx-auto ">
      <Select
        className="mx-auto w-1/3"
        id="view"
        label=""
        value={selectedView}
        onChange={(e) => setSelectedView(+e.target.value)}
        options={[
          {
            label: 'Current month',
            value: 0,
          },
          {
            label: 'Last month',
            value: 1,
          },
        ]}
      />
      <div className="mx-auto mt-6 aspect-square h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={[
              {
                name: 'Current month',
                income: 100,
                expenses: 40,
                'transfer-in': 10,
                'transfer-out': 10,
              },
            ]}
            maxBarSize={25}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" stackId={2} />
            <Bar dataKey="transfer-in" fill="#d02390" stackId={2} />
            <Bar dataKey="expenses" fill="#82ca9d" stackId={1} />
            <Bar dataKey="transfer-out" fill="#d1d42a" stackId={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
