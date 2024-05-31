'use client';

import { faMoneyBill, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormState } from 'react-dom';

import { payBillTrackItem } from '@/actions/money-track/bilTrackItems/payBillTrackItem';
import BaseButton from '@/components/buttons/BaseButton';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';

interface PayButtonPendingBillsProps {
  id: string;
  defaultAmount?: number;
}

export function PayButtonPendingBills({
  id,
  defaultAmount,
}: Readonly<PayButtonPendingBillsProps>) {
  const [isPaying, setIsPaying] = useState(false);
  const [status, formAction] = useFormState(payBillTrackItem, null);

  return (
    <>
      <BaseButton type="button" color="dark" onClick={() => setIsPaying(true)}>
        <FontAwesomeIcon icon={faMoneyBill} size="xl" />
      </BaseButton>
      <motion.div
        key={id}
        className="col-span-3 row-start-2 overflow-hidden"
        variants={{
          hidden: { height: 0, transition: { delay: 0.2 } },
          visible: { height: 84 },
        }}
        initial="hidden"
        animate={isPaying ? 'visible' : 'hidden'}
      >
        <motion.div
          className="pt-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2 } },
          }}
        >
          <form action={formAction}>
            <div className="flex w-full items-center gap-4">
              <input type="hidden" name="id" value={id} />
              <div className="flex-1">
                <Input
                  type="number"
                  step="0.01"
                  label="Amount"
                  name="amount"
                  defaultValue={defaultAmount}
                  errors={status?.errors?.amount?._errors}
                />
              </div>
              <FormButton color="dark">
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </FormButton>
              <BaseButton
                color="dark"
                type="button"
                onClick={() => setIsPaying(false)}
              >
                <FontAwesomeIcon icon={faTimes} size="xl" />
              </BaseButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
