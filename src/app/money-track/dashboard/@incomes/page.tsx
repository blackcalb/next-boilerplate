import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import getUserPreferences from '@/actions/auth/getUserPreferences';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import { getLastNMovements } from '@/queries/records/getLastNRecords';
import MovementItemSummary from '@/ui/money-track/Movements/MovementItemSummary';

export default async function IncomesPage() {
  const movemets = await getLastNMovements(CategoryType.Income, 5);
  const getPreferences = await getUserPreferences('money-track.dashboard');

  return (
    <Card
      className="text-green-600 dark:text-green-400"
      header={
        <div className="flex w-full items-center justify-between">
          <Typography className="text-xl font-bold">Latest Incoming</Typography>
          <Link href="/money-track/add/income">
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
          </Link>
        </div>
      }
      initialOpen={!!getPreferences?.income}
      savePreference="money-track.dashboard.income"
    >
      <div className="flex flex-col items-center gap-2">
        {movemets.length === 0 && (
          <div className="col-span-4 self-stretch text-center">
            <Typography variant="h5">No Incomes yet</Typography>
          </div>
        )}
        {movemets.map((movement) => (
          <MovementItemSummary
            movement={movement}
            key={movement._id.toString()}
          />
        ))}
      </div>
    </Card>
  );
}
