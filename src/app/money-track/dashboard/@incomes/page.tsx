import { Fragment } from 'react';

import { Text } from '@/components/Text/Text';
import { getLastNRecords } from '@/queries/records/getLastNRecords';

export default async function IncomesPage() {
  const incomes = await getLastNRecords('income', 5);

  return (
    <div className="grid grid-cols-4 items-center">
      {incomes.length === 0 && (
        <div className="col-span-4 self-stretch text-center">
          <Text variant="h5">No Incomes yet</Text>
        </div>
      )}
      {incomes.map((income) => (
        <Fragment key={income.id}>
          <Text className="col-span-2 text-2xl">{income.subject}</Text>
          <Text variant="p">
            {income.amount.currency} {income.amount.value}
          </Text>
          <Text variant="p">{Intl.DateTimeFormat().format(income.date)}</Text>
        </Fragment>
      ))}
    </div>
  );
}
