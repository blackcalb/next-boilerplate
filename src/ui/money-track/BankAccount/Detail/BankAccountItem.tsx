import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import Typography from '@/components/Typography';
import type { IBankAccount } from '@/models/money-track/BankAcounts';
import { cn } from '@/utils/cn';

export default function BankAccountItem({
  bankAccount,
}: Readonly<{ bankAccount: IBankAccount }>) {
  return (
    <Link href={`/money-track/accounts/${bankAccount._id}`}>
      <div
        className={cn(
          'px-4 py-2',
          'border-2 border-purple-500 rounded-md',
          'bg-purple-400 text-black',
          'flex gap-4 items-center',
        )}
      >
        <div className="flex flex-1 items-center gap-4">
          <FontAwesomeIcon icon={faMoneyBill} size="3x" />
          {bankAccount.name}
        </div>
        <Typography>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: bankAccount.currency,
          }).format(bankAccount.balance)}
        </Typography>
      </div>
    </Link>
  );
}
