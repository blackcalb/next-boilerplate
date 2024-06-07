/* eslint-disable no-underscore-dangle */

'use client';

import {
  faMoneyBillTransfer,
  faShuffle,
  faSquareCaretLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { transferBetweenAccountAction } from '@/actions/money-track/accounts/transferBetweenAccounts';
import type { IBankAccountFlatDocument } from '@/models/money-track/BankAcounts';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Input from '../inputs/input';
import Select from '../inputs/select';

interface TransferBetweenAccountsProps {
  accounts: IBankAccountFlatDocument[];
}

export default function TransferBetweenAccounts({
  accounts,
}: Readonly<TransferBetweenAccountsProps>) {
  const options = accounts.map((account) => ({
    value: account._id.toString(),
    label: account.name,
  }));
  const [state, formAction] = useFormState(transferBetweenAccountAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.data]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <Select
          label="From Account"
          id="fromAccountId"
          name="fromAccountId"
          options={options}
          defaultValue={options[0]?.value}
          errors={
            typeof state?.error !== 'string'
              ? state?.error?.fromAccountId?._errors
              : undefined
          }
        />
        <FontAwesomeIcon
          icon={faShuffle}
          size="2x"
          rotation={90}
          className="mt-4"
        />
        <Select
          label="To Account"
          id="toAccountId"
          name="toAccountId"
          options={options}
          defaultValue={options[1]?.value}
          errors={
            typeof state?.error !== 'string'
              ? state?.error?.toAccountId?._errors
              : undefined
          }
        />

        <Input
          type="number"
          name="amount"
          id="amount"
          label="Amount"
          className="mt-4"
          step="0.01"
          errors={
            typeof state?.error !== 'string'
              ? state?.error?.amount?._errors
              : undefined
          }
        />
        <div className="flex items-center justify-center gap-4">
          <div>
            <FormButtonIcon
              icon={<FontAwesomeIcon icon={faMoneyBillTransfer} size="3x" />}
              className="text-primary"
            />
          </div>
          <Link href="/money-track/dashboard" aria-label="Back to dashboard">
            <FontAwesomeIcon
              icon={faSquareCaretLeft}
              className="text-primary"
              size="3x"
            />
          </Link>
        </div>
        {state?.error && typeof state.error === 'string' && (
          <p>{state.error}</p>
        )}
      </div>
    </form>
  );
}
