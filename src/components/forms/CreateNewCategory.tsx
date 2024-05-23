'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewCategory } from '@/actions/money-track/add/category';

import FormButton from '../buttons/FormButton';

export default function CreateNewCategory() {
  const [state, formAction] = useFormState(createNewCategory, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.data]);

  return (
    <form action={formAction}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" required />
      </label>
      <label htmlFor="type">
        Type
        <select name="type" id="type" required>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>
      <FormButton>Create Category</FormButton>
    </form>
  );
}
