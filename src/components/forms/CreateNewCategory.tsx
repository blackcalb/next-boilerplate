'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewCategory } from '@/actions/money-track/add/category';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';

import Select from '../inputs/select';

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
      <div className="flex w-full flex-col gap-4">
        <Input label="Name" type="text" name="name" id="name" />

        <Select
          label="Type"
          id="type"
          name="type"
          options={[
            {
              value: 'expense',
              label: 'Expense',
            },
            {
              value: 'income',
              label: 'Income',
            },
          ]}
        />

        <FormButton className="self-center p-2" kind="contained">
          Create Category
        </FormButton>
      </div>
    </form>
  );
}
