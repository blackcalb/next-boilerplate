'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewAccount } from '@/actions/money-track/add/account';

import FormButton from '../buttons/FormButton';

export default function CreateNewAccount() {
  const [state, formAction] = useFormState(createNewAccount, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      router.push('/money-track');
    }
  }, [router, state?.data]);

  return (
    <form action={formAction}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" required />
      </label>

      <select name="currency" id="currency" required>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <label htmlFor="initialBalance">
        Initial Balance
        <input type="number" id="initialBalance" name="initialBalance" />
      </label>
      <FormButton>Create New Account</FormButton>
    </form>
  );
}
