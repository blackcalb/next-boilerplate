import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Card from '@/components/surface/card';
import Typography from '@/components/Typography';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
    >
      {children}
    </Card>
  );
}
