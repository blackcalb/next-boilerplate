'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewRecord } from '@/actions/money-track/add/record';
import FormButton from '@/components/buttons/FormButton';
import type { IBankAccountFlatDocument } from '@/models/money-track/BankAcounts';
import type {
  CategoryType,
  ICategoryFlatDocument,
} from '@/models/money-track/Categories';

interface CreateNewRecordProps {
  bankAccounts: IBankAccountFlatDocument[];
  categories: ICategoryFlatDocument[];
  type: CategoryType;
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
      router.push('/money-track/dashboard');
    }
  }, [router, state?.data]);

  return (
    <form className="flex flex-col" action={formAction}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="redirect" value="/money-track/dashboard" />
      <label htmlFor="name">
        Subject
        <input type="text" id="name" name="name" required />
      </label>
      {state?.error?.name && <p>{state.error.name._errors.join(', ')}</p>}
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
      {state?.error?.amount && <p>{state.error.amount?._errors.join(', ')}</p>}
      <label htmlFor="category">
        Category
        <select name="category" id="category" required>
          {categories.map((category) => (
            <option
              key={category._id.toString()}
              value={category._id.toString()}
            >
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
            <option key={account._id.toString()} value={account._id.toString()}>
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
