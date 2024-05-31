import getAccounts from '@/actions/money-track/accounts/getAccounts';
import ContentWrapper from '@/components/surface/content-wrapper';
import Text from '@/components/Text';
import AddNewAccount from '@/ui/money-track/BankAccount/AddNewAccount';
import BankAccountItem from '@/ui/money-track/BankAccount/Detail/BankAccountItem';

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <ContentWrapper>
      <Text as="h1" className="text-center text-2xl">
        Accounts
      </Text>

      {(!accounts || accounts.length === 0) && (
        <Text className="text-center">No accounts found</Text>
      )}
      <div className="flex flex-col items-center">
        <Text className="pb-2 pt-4">click below to add a new account</Text>
        <AddNewAccount />
      </div>

      <div className="mt-10 grid grid-cols-4 gap-4">
        {accounts?.map((account) => (
          <BankAccountItem key={account._id.toString()} account={account} />
        ))}
      </div>
    </ContentWrapper>
  );
}
