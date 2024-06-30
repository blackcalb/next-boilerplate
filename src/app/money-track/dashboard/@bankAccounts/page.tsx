import { faPlusCircle, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import getUserPreferences from '@/actions/auth/getUserPreferences';
import getBankAccounts from '@/actions/money-track/accounts/getAccounts';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import BankAccountItem from '@/ui/money-track/BankAccount/Detail/BankAccountItem';

export default async function BankPage() {
  const bankAccounts = await getBankAccounts({
    showAll: false,
  });
  const getPreferences = await getUserPreferences('money-track.dashboard');

  if (!bankAccounts) {
    return null;
  }

  return (
    <Card
      header={
        <div className="flex w-full justify-between">
          <Typography className="text-xl font-bold">Accounts</Typography>
          <div className="flex gap-4">
            <Link href="/money-track/accounts/transfer-between-bank-accounts">
              <FontAwesomeIcon icon={faShuffle} size="2x" />
            </Link>
            <Link href="/money-track/add/account">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </Link>
          </div>
        </div>
      }
      className="flex flex-col text-amber-600 dark:text-amber-400"
      initialOpen={!!getPreferences?.bankAccounts}
      savePreference="money-track.dashboard.bankAccounts"
    >
      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {bankAccounts.map((bankAccount) => (
          <BankAccountItem
            key={bankAccount._id.toString()}
            bankAccount={bankAccount}
          />
        ))}
      </div>
    </Card>
  );
}
