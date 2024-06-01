'use client';

import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
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
  const { data } = useGetAccountMovements(accountId, selectedView);

  return (
    <div className="mx-auto ">
      <Select
        className="mx-auto w-1/2"
        name="view"
        label=""
        value={selectedView}
        onChange={(e) => setSelectedView(+e.target.value)}
        options={[
          {
            label: 'Current month',
            value: 0,
          },
          {
            label: 'Last two month',
            value: 1,
          },
          {
            label: 'Last three month',
            value: 2,
          },
        ]}
      />
      <div className="mx-auto mt-6 aspect-square h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={600} height={300} data={data ?? []} maxBarSize={25}>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="deposit" fill="#23d031" stackId={2} />
            <Bar dataKey="transfer-in" fill="#d02390" stackId={2} />
            <Bar dataKey="expense" fill="#ee9949" stackId={1} />
            <Bar dataKey="transfer-out" fill="#bba11e" stackId={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
