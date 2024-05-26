import { notFound } from 'next/navigation';

import getAccount from '@/actions/money-track/accounts/getAccount';
import ContentWrapper from '@/components/surface/content-wrapper';
import Text from '@/components/Text';

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
      <div className="mt-16">
        <Text variant="h1" className="text-center capitalize">
          {account?.name}
        </Text>

        <Text variant="h2" className="mb-6">
          Summary
        </Text>
        <div className="pl-6">
          <Text>
            Balance:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'EUR',
            }).format(account?.balance)}
          </Text>
          <AccountSummary accountId={account.id} />
          total income total expenses transfers to another accounts
        </div>
      </div>
    </ContentWrapper>
  );
}
