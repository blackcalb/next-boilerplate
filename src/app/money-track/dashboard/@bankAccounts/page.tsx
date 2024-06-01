import getBankAccounts from '@/actions/money-track/accounts/getAccounts';
import BankAccountItem from '@/ui/money-track/BankAccount/Detail/BankAccountItem';

export default async function BankPage() {
  const bankAccounts = await getBankAccounts({
    showAll: false,
  });

  if (!bankAccounts) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {bankAccounts.map((bankAccount) => (
        <BankAccountItem
          key={bankAccount._id.toString()}
          bankAccount={bankAccount}
        />
      ))}
    </div>
  );
}
