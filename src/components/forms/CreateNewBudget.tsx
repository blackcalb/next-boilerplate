'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewBudget } from '@/actions/money-track/add/budget';
import type { ICategoryFlatDocument } from '@/models/money-track/Categories';

import FormButton from '../buttons/FormButton';

interface CreateNewBudgetProps {
  categories: ICategoryFlatDocument[];
}

export default function CreateNewBudget({
  categories,
}: Readonly<CreateNewBudgetProps>) {
  const [state, formAction] = useFormState(createNewBudget, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.status]);

  return (
    <form action={formAction}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" required />
      </label>

      <label htmlFor="from">
        From
        <input type="date" id="from" name="from" required />
      </label>
      <label htmlFor="to">
        To
        <input type="date" id="to" name="to" required />
      </label>

      <label htmlFor="category">
        Category
        <select name="category" id="category" required multiple>
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
      <label htmlFor="budget">
        budget{' '}
        <input
          type="number"
          min={0}
          step={0.01}
          id="budget"
          name="budget"
          required
        />
      </label>
      <label htmlFor="addPreviousCreatedRecords">
        Add Previous Created Records?
        <input
          type="checkbox"
          id="addPreviousCreatedRecords"
          name="addPreviousCreatedRecords"
        />
      </label>
      <FormButton>Create New Account</FormButton>
    </form>
  );
}
