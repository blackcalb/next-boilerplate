import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import getUserPreferences from '@/actions/auth/getUserPreferences';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import { getCurrentBudgets } from '@/queries/budgets/getCurrentBudgets';
import BudgetItem from '@/ui/money-track/Budget/BusgetItem';

export default async function BudgetsPage() {
  const currentBudgets = await getCurrentBudgets();
  const getPreferences = await getUserPreferences('money-track.dashboard');

  return (
    <Card
      className="text-blue-600 dark:text-blue-400"
      header={
        <div className="flex w-full justify-between">
          <Typography className="text-xl font-bold">Budgets</Typography>
          <Link href="/money-track/add/budget">
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
          </Link>
        </div>
      }
      initialOpen={!!getPreferences?.budgets}
      savePreference="money-track.dashboard.budgets"
    >
      <div className="flex w-full flex-col gap-2">
        {currentBudgets.map((budget) => (
          <BudgetItem key={budget._id.toString()} budget={budget} />
        ))}
      </div>
    </Card>
  );
}
