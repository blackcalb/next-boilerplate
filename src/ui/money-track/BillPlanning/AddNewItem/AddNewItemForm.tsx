/* eslint-disable unused-imports/no-unused-vars */

'use client';

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons/faCancel';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { billTrackItem } from '@/actions/money-track/bilTrackItems/billTrackItem';
import BaseButton from '@/components/buttons/BaseButton';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';
import Select from '@/components/inputs/select';
import type { IBankAccountClient } from '@/models/money-track/BankAcounts';
import type { IClientCategory } from '@/models/money-track/Categories';
import { cn } from '@/utils/cn';
import mapDocumentToSelectOption from '@/utils/mapDocumentToSelectOption';

import styles from './AddNewItemForm.module.css';
// import styles from './AddNewItemForm.module.css'

interface AddNewItemFormProps {
  bankAccounts: IBankAccountClient[];
  expenseCategories: IClientCategory[];
}

export function AddNewItemForm({
  bankAccounts,
  expenseCategories,
}: Readonly<AddNewItemFormProps>) {
  const [adding, setAdding] = useState(false);
  const [status, formAction] = useFormState(billTrackItem, null);

  const animation = adding ? 'adding' : 'notAdding';
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status?.status === 'success') {
      formRef.current?.reset();
      setAdding(false);
    }
  }, [status]);

  return (
    <motion.div
      className={cn('w-full flex flex-col items-center gap-8', styles.wrapper)}
      animate={animation}
      initial="notAdding"
      variants={{
        notAdding: {
          height: '100px',
          transition: {
            delay: 0.2,
          },
        },
        adding: {
          height: '550px',
        },
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <motion.div
        animate={animation}
        initial="notAdding"
        variants={{
          notAdding: { opacity: 1, y: 16, transition: { delay: 0.2 } },
          adding: { opacity: 0, y: -116 },
        }}
      >
        <BaseButton
          type="button"
          onClick={() => {
            setAdding(true);
          }}
          aria-label="Create new bill to track"
        >
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon icon={faSquarePlus} size="2x" />
            <div>Create new bill to track</div>
          </div>
        </BaseButton>
      </motion.div>

      <motion.div
        key="adding-form"
        className={cn(
          'w-full',
          'border-2 border-white',
          'rounded-lg',
          styles.formWrapper,
        )}
        animate={animation}
        initial="notAdding"
        variants={{
          notAdding: {
            opacity: 0,
          },
          adding: {
            opacity: 1,
            y: -90,
            transition: {
              delay: 0.2,
            },
          },
        }}
      >
        <form action={formAction} ref={formRef}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Name"
              name="name"
              errors={status?.error?.name?._errors}
            />
            <Input
              type="number"
              name="expectedAmount"
              label="Expected amount"
              step={0.01}
              errors={status?.error?.expectedAmount?._errors}
            />

            <Input
              type="date"
              label="date"
              name="date"
              errors={status?.error?.date?._errors}
            />
            <Select
              name="bankAccountId"
              id="bankAccountId"
              label="Bank account"
              options={bankAccounts.map(mapDocumentToSelectOption)}
              errors={status?.error?.bankAccountId?._errors}
            />
            <Select
              name="categoryId"
              id="categoryId"
              label="Category"
              options={expenseCategories.map(mapDocumentToSelectOption)}
              errors={status?.error?.categoryId?._errors}
            />

            <div className="mx-auto flex gap-8">
              <FormButton>
                <FontAwesomeIcon icon={faPlus} size="2xl" />
              </FormButton>
              <BaseButton
                type="button"
                onClick={() => {
                  formRef.current?.reset();
                  setAdding(false);
                }}
              >
                <FontAwesomeIcon icon={faCancel} size="2xl" />
              </BaseButton>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
