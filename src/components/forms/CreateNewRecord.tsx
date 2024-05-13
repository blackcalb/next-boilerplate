/* eslint-disable no-underscore-dangle */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewRecord } from '@/actions/money-track/add/record';
import FormButton from '@/components/buttons/FormButton';
import type { RecordType } from '@/types/moneyTrack';

interface CreateNewRecordProps {
  bankAccounts: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  type: RecordType;
}

export default function CreateNewRecord({
  bankAccounts,
  categories,
  type,
}: Readonly<CreateNewRecordProps>) {
  const [state, formAction] = useFormState(createNewRecord, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      router.push('/money-track');
    }
  }, [router, state?.data]);

  return (
    <form className="flex flex-col" action={formAction}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="redirect" value="/money-track" />
      <label htmlFor="subject">
        Subject
        <input type="text" id="subject" name="subject" required />
      </label>
      {state?.error?.subject && <p>{state.error.subject._errors.join(', ')}</p>}
      <label htmlFor="amount">
        amount{' '}
        <input
          type="number"
          min={0}
          step={0.01}
          id="amount"
          name="amount"
          required
        />
      </label>
      {state?.error?.amount && <p>{state.error.amount._errors.join(', ')}</p>}
      {state?.error?.amount && (
        <p>{state.error.amount.value?._errors.join(', ')}</p>
      )}
      <label htmlFor="category">
        Category
        <select name="category" id="category" required>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {state?.error?.categoryId && (
        <p>{state.error.categoryId._errors.join(', ')}</p>
      )}
      <label htmlFor="account">
        <select name="account" id="account" required>
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </label>
      {state?.error?.accountId && (
        <p>{state.error.accountId._errors.join(', ')}</p>
      )}
      <label htmlFor="date">
        Date
        <input type="date" id="date" name="date" required />
      </label>
      {state?.error?.date && <p>{state.error.date._errors.join(', ')}</p>}
      <FormButton>Crear</FormButton>
    </form>
  );
}
