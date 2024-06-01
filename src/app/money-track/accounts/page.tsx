import getBankAccounts from '@/actions/money-track/accounts/getAccounts';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import AddNewAccount from '@/ui/money-track/BankAccount/AddNewAccount';
import BankAccountItem from '@/ui/money-track/BankAccount/Detail/BankAccountItem';

export default async function AccountsPage() {
  const bankAccounts = await getBankAccounts();

  return (
    <ContentWrapper>
      <Typography as="h1" className="text-center text-2xl">
        Accounts
      </Typography>

      {(!bankAccounts || bankAccounts.length === 0) && (
        <Typography className="text-center">No accounts found</Typography>
      )}
      <div className="flex flex-col items-center">
        <Typography className="pb-2 pt-4">
          click below to add a new account
        </Typography>
        <AddNewAccount />
      </div>

      <div className="mt-10 grid grid-cols-4 gap-4">
        {bankAccounts?.map((bankAccount) => (
          <BankAccountItem
            key={bankAccount._id.toString()}
            bankAccount={bankAccount}
          />
        ))}
      </div>
    </ContentWrapper>
  );
}
