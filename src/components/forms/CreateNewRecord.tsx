'use client';

import {
  faSquareCaretLeft,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { createNewRecord } from '@/actions/money-track/add/record';
import type { CategoryType } from '@/models/money-track/Categories';
import type { Option } from '@/types/moneyTrack';

import FormButtonIcon from '../buttons/FormButtonIcon';
import Input from '../inputs/input';
import Select from '../inputs/select';

interface CreateNewRecordProps {
  bankAccountOptions: Option[];
  categoriesOptions: Option[];
  type: CategoryType;
}

export default function CreateNewRecord({
  bankAccountOptions,
  categoriesOptions,
  type,
}: Readonly<CreateNewRecordProps>) {
  const [state, formAction] = useFormState(createNewRecord, null);
  const router = useRouter();
  const refNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/money-track/dashboard');
    }
  }, [router, state?.status]);

  // focus on first input when load
  useLayoutEffect(() => {
    refNameInput.current?.focus();
  }, []);

  return (
    <form className="flex w-full flex-col gap-2" action={formAction}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="redirect" value="/money-track/dashboard" />
      <Input
        name="name"
        label="Subject"
        required
        errors={state?.error?.name?._errors}
        ref={refNameInput}
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
        options={categoriesOptions}
        errors={state?.error?.categoryId?._errors}
      />

      <Select
        name="bankAccountId"
        label="Bank Account"
        required
        options={bankAccountOptions}
        errors={state?.error?.bankAccountId?._errors}
      />

      <Input
        type="date"
        name="date"
        label="Date"
        required
        defaultValue={
          new Date(
            new Date().getTime() -
              (480 + new Date().getTimezoneOffset()) * 60 * 1000,
          )
            .toISOString()
            .split('T')[0]
        }
        errors={state?.error?.date?._errors}
      />

      <div className="flex items-center justify-center gap-4">
        <div>
          <FormButtonIcon
            aria-label={`Create a new ${type}`}
            className="mx-auto"
            icon={<FontAwesomeIcon icon={faSquarePlus} size="3x" />}
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
    </form>
  );
}
