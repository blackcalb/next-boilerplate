import Link from 'next/link';

import BaseButton from '@/components/buttons/BaseButton';
import getAccounts from '@/queries/accounts/getBanks';

export default async function BankPage() {
  const accounts = await getAccounts();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between">
      <div className="grid w-full grid-cols-3">
        {accounts.map((account) => (
          <div key={account.id} className="border border-gray-200 p-4">
            <h2 className="text-lg font-semibold">{account.name}</h2>
            <p>
              Balance: {account.balance} {account.currency}
            </p>
          </div>
        ))}
      </div>
      <Link href="/money-track/add/account">
        <BaseButton type="button">Add a New Account</BaseButton>
      </Link>
    </div>
  );
}
