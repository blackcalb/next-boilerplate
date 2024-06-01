'use client';

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { createNewRecord } from '@/actions/money-track/add/record';
import type { IBankAccountFlatDocument } from '@/models/money-track/BankAcounts';
import type {
  CategoryType,
  ICategoryFlatDocument,
} from '@/models/money-track/Categories';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Input from '../inputs/input';
import Select from '../inputs/select';

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
    if (state?.status === 'success') {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.status]);

  return (
    <form className="flex w-full flex-col gap-2" action={formAction}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="redirect" value="/money-track/dashboard" />
      <Input
        name="name"
        label="Subject"
        required
        errors={state?.error?.name?._errors}
      />

      <Input
        name="amount"
        type="number"
        min={0}
        step={0.01}
        label="Amount"
        required
        errors={state?.error?.amount?._errors}
      />

      <Select
        name="category"
        label="Category"
        required
        options={categories.map((category) => ({
          value: category._id.toString(),
          label: category.name,
        }))}
        errors={state?.error?.categoryId?._errors}
      />

      <Select
        name="bankAccountId"
        label="Bank Account"
        required
        options={bankAccounts.map((bankAccount) => ({
          value: bankAccount._id.toString(),
          label: bankAccount.name,
        }))}
        errors={state?.error?.bankAccountId?._errors}
      />

      <Input
        type="date"
        name="date"
        label="Date"
        required
        errors={state?.error?.date?._errors}
      />

      <FormButtonIcon
        icon={<FontAwesomeIcon icon={faSquarePlus} size="3x" />}
        className="mx-auto"
      />
    </form>
  );
}
