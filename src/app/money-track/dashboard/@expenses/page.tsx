import { Fragment } from 'react';

import { Text } from '@/components/Text/Text';
import { getLastNRecords } from '@/queries/records/getLastNRecords';

export default async function ExpensesPage() {
  const expenses = await getLastNRecords('expense', 5);

  return (
    <div className="grid grid-cols-4 items-center">
      {expenses.length === 0 && (
        <div className="col-span-4 self-stretch text-center">
          <Text variant="h5">No expenses yet</Text>
        </div>
      )}
      {expenses.map((income) => (
        <Fragment key={income.id}>
          <Text variant="h5" className="col-span-2">
            {income.subject}
          </Text>
          <Text variant="p">
            {income.amount.currency} {income.amount.value}
          </Text>
          <Text variant="p">{Intl.DateTimeFormat().format(income.date)}</Text>
        </Fragment>
      ))}
    </div>
  );
}
