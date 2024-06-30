import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import getUserPreferences from '@/actions/auth/getUserPreferences';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import { getLastNMovements } from '@/queries/records/getLastNRecords';
import MovementItem from '@/ui/money-track/Movements/MovementItem';

export default async function ExpensesPage() {
  const movemets = await getLastNMovements(CategoryType.Expense, 5);
  const getPreferences = await getUserPreferences('money-track.dashboard');

  return (
    <Card
      className="text-red-600 dark:text-red-400"
      header={
        <div className="flex w-full justify-between">
          <Typography className="text-xl font-bold">Latest Expenses</Typography>
          <Link href="/money-track/add/expense">
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
          </Link>
        </div>
      }
      initialOpen={!!getPreferences?.expense}
      savePreference="money-track.dashboard.expense"
    >
      <div className="flex flex-col items-center gap-2">
        {movemets.length === 0 && (
          <div className="col-span-4 self-stretch text-center">
            <Typography variant="h5">No expenses yet</Typography>
          </div>
        )}
        {movemets.map((movement) => (
          <MovementItem movement={movement} key={movement._id.toString()} />
        ))}
        <Link href="/money-track/expenses">
          <Typography className="py-4">View all</Typography>
        </Link>
      </div>
    </Card>
  );
}
