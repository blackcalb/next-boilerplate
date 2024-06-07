import getAccounts from '@/actions/money-track/accounts/getAccounts';
import TransferBetweenAccounts from '@/components/forms/TransferBetweenAccounts';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';

export default async function TransferBetweenBankAccountsPage() {
  const accounts = await getAccounts();

  return (
    <ContentWrapper>
      <Typography className="mb-10 text-center" variant="h1">
        Transfer Between Bank Accounts
      </Typography>

      <div className="mx-auto w-full md:w-1/2">
        <TransferBetweenAccounts accounts={accounts} />
      </div>
    </ContentWrapper>
  );
}
