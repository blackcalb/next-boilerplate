import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import getAccounts from '@/actions/money-track/accounts/getAccounts';
import type { IBankAccountFlatDocument } from '@/models/money-track/BankAcounts';

function AccountCard({
  account,
}: Readonly<{ account: IBankAccountFlatDocument }>) {
  return (
    <Link href={`/money-track/accounts/${account._id}`}>
      <div className="flex flex-col items-center justify-center p-4">
        <FontAwesomeIcon icon={faMoneyCheckAlt} size="4x" />
        <h2 className="text-lg font-semibold">{account.name}</h2>
        <p>
          {account.balance} {account.currency}
        </p>
      </div>
    </Link>
  );
}

export default async function BankPage() {
  const accounts = await getAccounts({
    showAll: false,
  });

  if (!accounts) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
      {accounts.map((account) => (
        <AccountCard key={account._id.toString()} account={account} />
      ))}
    </div>
  );
}
