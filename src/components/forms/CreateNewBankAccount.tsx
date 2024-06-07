'use client';

import {
  faSquareCaretLeft,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewAccount } from '@/actions/money-track/add/account';
import Input from '@/components/inputs/input';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Select from '../inputs/select';

export default function CreateNewBankAccount() {
  const [state, formAction] = useFormState(createNewAccount, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.status]);

  return (
    <form action={formAction}>
      <div className="flex w-full flex-col gap-4">
        <Input label="Name" type="text" name="name" id="name" />

        <Input
          label="Initial balance"
          type="number"
          name="initialBalance"
          id="initialBalance"
          step="0.01"
        />
        <Select
          label="Currency"
          id="currency"
          name="currency"
          options={[
            { value: 'EUR', label: 'EUR' },
            { value: 'USD', label: 'USD' },
            { value: 'GBP', label: 'GBP' },
            { value: 'JPY', label: 'JPY' },
          ]}
        />

        <div className="flex items-center justify-center gap-4">
          <div>
            <FormButtonIcon
              icon={<FontAwesomeIcon icon={faSquarePlus} size="3x" />}
              className="mx-auto"
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
      </div>
    </form>
  );
}
