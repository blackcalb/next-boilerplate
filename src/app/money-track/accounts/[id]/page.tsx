import { notFound } from 'next/navigation';

import getAccount from '@/actions/money-track/accounts/getAccount';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import SwitchShowPreferences from '@/ui/money-track/BankAccount/Detail/SwitchShowPreferences';

import { AccountDescription } from './AccountDescription';
import { AccountSummary } from './AccountSummary';

export default async function AccountDetailPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const account = await getAccount(params.id);

  if (!account) {
    return notFound();
  }

  return (
    <ContentWrapper>
      <div className="mt-16 flex flex-col gap-4">
        <Typography variant="h1" className="text-center capitalize">
          {account?.name}
        </Typography>
        <AccountDescription
          description={account.description}
          accountId={account._id.toString()}
        />

        <Typography variant="h2" className="mb-6">
          Summary
        </Typography>
        <div className="pl-6">
          <Typography className="mb-6">
            Balance:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'EUR',
            }).format(account?.balance)}
          </Typography>
          <AccountSummary accountId={account._id.toString()} />
        </div>

        <Typography variant="h2" className="mb-6">
          Options
        </Typography>
        <SwitchShowPreferences
          bankAccountId={account._id.toString()}
          value={account.options?.hideInDashboard}
        />
      </div>
    </ContentWrapper>
  );
}
