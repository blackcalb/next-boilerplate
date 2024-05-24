'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewAccount } from '@/actions/money-track/add/account';
import Input from '@/components/inputs/input';

import FormButton from '../buttons/FormButton';
import Select from '../inputs/select';

export default function CreateNewAccount() {
  const [state, formAction] = useFormState(createNewAccount, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.data]);

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

        <FormButton kind="contained" className="self-center p-2">
          Create New Account
        </FormButton>
      </div>
    </form>
  );
}
