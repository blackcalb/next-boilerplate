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

import { createNewCategory } from '@/actions/money-track/add/category';
import Input from '@/components/inputs/input';

import FormButtonIcon from '../buttons/FormButtonIcon';
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
