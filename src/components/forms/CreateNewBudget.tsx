'use client';

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewBudget } from '@/actions/money-track/add/budget';
import type { ICategoryFlatDocument } from '@/models/money-track/Categories';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Checkbox from '../inputs/checkbox';
import Input from '../inputs/input';
import Select from '../inputs/select';

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
      <div className="flex flex-col gap-2">
        <Input name="name" label="Name" type="text" required />
        <Input
          name="from"
          label="From"
          type="date"
          required
          defaultValue={
            new Date(new Date().getFullYear(), new Date().getMonth(), 2)
              .toISOString()
              .split('T')[0]
          }
        />
        <Input
          name="to"
          label="To"
          type="date"
          required
          defaultValue={
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
              .toISOString()
              .split('T')[0]
          }
        />

        <Select
          name="category"
          label="Category"
          required
          options={categories.map((category) => ({
            value: category._id.toString(),
            label: category.name,
          }))}
          multiple
        />
        <Input
          name="budget"
          label="budget"
          type="number"
          min={0}
          step={0.01}
          required
        />

        <Checkbox
          name="addPreviousCreatedRecords"
          label="Add Previous Created Records?"
        />

        <FormButtonIcon
          icon={<FontAwesomeIcon icon={faSquarePlus} size="3x" />}
          className="mx-auto"
        />
      </div>
    </form>
  );
}
