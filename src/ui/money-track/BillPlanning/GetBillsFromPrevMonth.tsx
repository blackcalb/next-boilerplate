'use client';

import {
  faCheckSquare,
  faTimesSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { copyBillsFromMonth } from '@/actions/money-track/billTrack/copyBillsFromPrevMonth';
import ButtonIcon from '@/components/buttons/ButtonIcon';
import SubmitButtonIcon from '@/components/buttons/SubmitButtonIcon';
import Typography from '@/components/Typography';

interface GetBillsFromPrevMonthProps {
  billingDate: Date;
  monthsAvailables: { month: number; year: number }[];
}

export function GetBillsFromPrevMonth({
  billingDate,
  monthsAvailables,
}: Readonly<GetBillsFromPrevMonthProps>) {
  const [selectingMonth, setSelectingMonth] = useState(true);
  const [state, formAction] = useFormState(copyBillsFromMonth, null);

  useEffect(() => {
    if (state?.status === 'success') {
      setSelectingMonth(false);
    }
  }, [state?.status]);

  if (selectingMonth) {
    return (
      <form className="flex w-full items-end gap-2" action={formAction}>
        <input
          type="hidden"
          name="billingDate"
          value={`${billingDate.getFullYear()}-${billingDate.getMonth()}`}
        />
        <input type="hidden" name="path" value="/money-track/dashboard" />
        <div className="flex-1">
          <label htmlFor="date">
            <Typography>Select a month</Typography>
            <select id="date" name="date">
              {monthsAvailables.map(({ month, year }) => (
                <option key={`${year}-${month}`} value={`${year}-${month}`}>
                  {month}/{year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <SubmitButtonIcon icon={<FontAwesomeIcon icon={faCheckSquare} />} />
        <ButtonIcon icon={<FontAwesomeIcon icon={faTimesSquare} />} />
      </form>
    );
  }

  return (
    <button
      onClick={() => setSelectingMonth(true)}
      type="button"
      aria-label="Copy from prev month"
    >
      <Typography>Copy from prev month</Typography>
    </button>
  );
}
