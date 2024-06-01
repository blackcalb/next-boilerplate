import { faPlusCircle, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Card from '@/components/surface/card';
import Typography from '@/components/Typography';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      header={
        <div className="flex w-full justify-between">
          <Typography className="text-xl font-bold">Accounts</Typography>
          <div className="mr-8 flex gap-4">
            <Link href="/money-track/accounts/transfer-between-accounts">
              <FontAwesomeIcon icon={faShuffle} size="2x" />
            </Link>
            <Link href="/money-track/add/account">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </Link>
          </div>
        </div>
      }
      className="flex flex-col text-amber-600 dark:text-amber-400"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex-1">{children}</div>
        <Link href="/money-track/accounts">
          <Typography> Show All</Typography>
        </Link>
      </div>
    </Card>
  );
}
