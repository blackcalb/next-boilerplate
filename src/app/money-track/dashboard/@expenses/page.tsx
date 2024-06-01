import { Fragment } from 'react';

import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import { getLastNMovements } from '@/queries/records/getLastNRecords';

export default async function ExpensesPage() {
  const movemets = await getLastNMovements(CategoryType.Expense, 5);

  return (
    <div className="grid grid-cols-4 items-center">
      {movemets.length === 0 && (
        <div className="col-span-4 self-stretch text-center">
          <Typography variant="h5">No expenses yet</Typography>
        </div>
      )}
      {movemets.map((movement) => (
        <Fragment key={movement._id.toString()}>
          <Typography variant="h5" className="col-span-2">
            {movement.name}
          </Typography>
          <Typography variant="p">
            {movement.currency} {-1 * movement.amount}
          </Typography>
          <Typography variant="p">
            {Intl.DateTimeFormat().format(movement.date)}
          </Typography>
        </Fragment>
      ))}
    </div>
  );
}
