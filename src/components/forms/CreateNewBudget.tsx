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

import { createNewBudget } from '@/actions/money-track/add/budget';
import type { Option } from '@/types/moneyTrack';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Checkbox from '../inputs/checkbox';
import Input from '../inputs/input';
import Select from '../inputs/select';

interface CreateNewBudgetProps {
  categoriesOptions: Option[];
}

export default function CreateNewBudget({
  categoriesOptions,
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
          options={categoriesOptions}
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
