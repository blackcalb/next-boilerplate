import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import getAccounts from '@/queries/accounts/getBanks';
import type { Account } from '@/types/moneyTrack';

function AccountCard({ account }: Readonly<{ account: Account }>) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <FontAwesomeIcon icon={faMoneyCheckAlt} size="4x" />
      <h2 className="text-lg font-semibold">{account.name}</h2>
      <p>
        Balance: {account.balance} {account.currency}
      </p>
    </div>
  );
}

export default async function BankPage() {
  const accounts = await getAccounts();

  return (
    <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
