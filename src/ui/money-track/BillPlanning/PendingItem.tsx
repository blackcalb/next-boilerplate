/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { payBillTrackItem } from '@/actions/money-track/bilTrackItems/payBillTrackItem';

import { DeleteButton } from './DeleteButton';

export function PendingItem({ bill }: Readonly<{ bill: any }>) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [status, formAction] = useFormState(payBillTrackItem, null);

  useEffect(() => {
    if (status?.status === 'success') {
      setIsCompleting(false);
    }
  }, [status, setIsCompleting]);

  const id = bill._id.toString();

  return (
    <tr key={id}>
      <td>{bill.name}</td>
      <td>{bill.expectedAmount}</td>
      <td>{bill.date}</td>
      <td>
        {isCompleting ? (
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input
              type="hidden"
              name="bankAccountId"
              value={bill.bankAccountId.toString()}
            />
            <input
              type="number"
              step="0.01"
              id="amount"
              name="amount"
              defaultValue={bill.expectedAmount}
            />
            <button type="submit">ok</button>
            <button type="button" onClick={() => setIsCompleting(false)}>
              cancel
            </button>
          </form>
        ) : (
          <>
            <button type="button" onClick={() => setIsCompleting(true)}>
              Pay
            </button>
            <DeleteButton id={id} />
          </>
        )}
      </td>
    </tr>
  );
}
