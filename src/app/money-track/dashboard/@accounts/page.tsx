import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import BaseButton from '@/components/buttons/BaseButton';
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
    <div className="flex w-full flex-1 flex-col items-center justify-between">
      <div className="grid w-full grid-cols-3 gap-10">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      <Link href="/money-track/add/account">
        <BaseButton type="button">Add a New Account</BaseButton>
      </Link>
    </div>
  );
}
