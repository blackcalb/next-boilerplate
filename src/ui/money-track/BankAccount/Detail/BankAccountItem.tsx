import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Text from '@/components/Text';
import type { IBankAccount } from '@/models/money-track/BankAcounts';

export default function BankAccountItem({
  account,
}: Readonly<{ account: IBankAccount }>) {
  return (
    <Link href={`/money-track/accounts/${account._id}`}>
      <div className="rounded-md border-2 border-orange-400 px-2 py-4 text-orange-400 dark:border-orange-600">
        <div className="text-center">
          <FontAwesomeIcon icon={faWallet} size="2x" />
        </div>
        <Text className="mt-2 text-center text-2xl">{account.name}</Text>
        <Text className="mt-2 text-center">
          {Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: account.currency,
          }).format(account.balance)}
        </Text>
      </div>
    </Link>
  );
}
