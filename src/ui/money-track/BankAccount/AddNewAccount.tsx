'use client';

import { faPlusSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons/faSquareXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { createNewAccount } from '@/actions/money-track/add/account';
import BaseButton from '@/components/buttons/BaseButton';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';
import Select from '@/components/inputs/select';

export default function AddNewAccount() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [state, formAction] = useFormState(createNewAccount, null);

  const refForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.status === 'success') {
      setIsCreatingAccount(false);
    }
  }, [state?.status]);

  return (
    <>
      <motion.div
        initial="visible"
        animate={isCreatingAccount ? 'hidden' : 'visible'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <BaseButton
          type="button"
          aria-label="Add new account"
          onClick={() => setIsCreatingAccount(true)}
        >
          <FontAwesomeIcon icon={faPlusSquare} size="2x" />
        </BaseButton>
      </motion.div>
      <motion.div
        initial="hidden"
        className="overflow-hidden"
        animate={isCreatingAccount ? 'visible' : 'hidden'}
        variants={{
          hidden: { height: 0 },
          visible: { height: 360 },
        }}
      >
        <form action={formAction} ref={refForm}>
          <div className="flex w-full min-w-[400px] flex-col gap-4">
            <input type="hidden" name="path" value="/money-track/accounts" />
            <Input
              label="Name"
              type="text"
              name="name"
              id="name"
              errors={state?.error?.name?._errors}
            />

            <Input
              label="Initial balance"
              type="number"
              name="initialBalance"
              id="initialBalance"
              step="0.01"
              errors={state?.error?.initialBalance?._errors}
            />
            <Select
              label="Currency"
              id="currency"
              name="currency"
              options={[
                { value: 'EUR', label: 'EUR' },
                { value: 'USD', label: 'USD' },
                { value: 'GBP', label: 'GBP' },
                { value: 'JPY', label: 'JPY' },
              ]}
              errors={state?.error?.currency?._errors}
            />
            <div className="flex justify-center gap-4">
              <FormButton className="self-center">
                <FontAwesomeIcon icon={faSquareCheck} size="3x" />
              </FormButton>
              <BaseButton
                type="button"
                onClick={() => {
                  setIsCreatingAccount(false);
                  refForm.current?.reset();
                }}
              >
                <FontAwesomeIcon icon={faSquareXmark} size="3x" />
              </BaseButton>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
}
