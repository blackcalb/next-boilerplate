import getAccounts from '@/queries/accounts/getBanks';

export default async function BankPage() {
  const accounts = await getAccounts();

  return (
    <div className="grid grid-cols-3">
      {accounts.map((account) => (
        <div key={account.id} className="border border-gray-200 p-4">
          <h2 className="text-lg font-semibold">{account.name}</h2>
          <p>
            Balance;j: {account.balance} {account.currency}
          </p>
        </div>
      ))}
    </div>
  );
}
