import { Fragment } from 'react';

import { Text } from '@/components/Text/Text';
import { CategoryType } from '@/models/money-track/Categories';
import { getLastNMovements } from '@/queries/records/getLastNRecords';

export default async function ExpensesPage() {
  const movemets = await getLastNMovements(CategoryType.Expense, 5);

  return (
    <div className="grid grid-cols-4 items-center">
      {movemets.length === 0 && (
        <div className="col-span-4 self-stretch text-center">
          <Text variant="h5">No expenses yet</Text>
        </div>
      )}
      {movemets.map((movement) => (
        <Fragment key={movement._id.toString()}>
          <Text variant="h5" className="col-span-2">
            {movement.name}
          </Text>
          <Text variant="p">
            {movement.currency} {-1 * movement.amount}
          </Text>
          <Text variant="p">{Intl.DateTimeFormat().format(movement.date)}</Text>
        </Fragment>
      ))}
    </div>
  );
}
