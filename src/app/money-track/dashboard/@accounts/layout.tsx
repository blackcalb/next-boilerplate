import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Card from '@/components/surface/card';
import Text from '@/components/Text';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      title="Accounts"
      header={
        <div>
          <Text className="text-lg">Accounts</Text>
          <Link href="/money-track/accounts/transfer-between-accounts">
            <FontAwesomeIcon icon={faShuffle} size="2x" />
          </Link>
        </div>
      }
      className="flex flex-col text-amber-600 dark:text-amber-400"
    >
      {children}
    </Card>
  );
}
