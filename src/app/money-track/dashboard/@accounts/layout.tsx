import { faPlusCircle, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Card from '@/components/surface/card';
import Text from '@/components/Text';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      header={
        <div className="flex w-full justify-between">
          <Text className="text-xl font-bold">Accounts</Text>
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
      {children}
    </Card>
  );
}
