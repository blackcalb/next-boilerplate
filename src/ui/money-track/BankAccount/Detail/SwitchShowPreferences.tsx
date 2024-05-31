'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';

import switchShowOnDashboard from '@/actions/money-track/bankAccounts/switchShowOnDashboard';

interface SwitchShowPreferencesProps {
  bankAccountId: string;
  value?: boolean;
}

export default function SwitchShowPreferences({
  bankAccountId,
  value = false,
}: Readonly<SwitchShowPreferencesProps>) {
  const form = useFormState(switchShowOnDashboard, null);
  const submitButton = useRef<HTMLButtonElement>(null);

  return (
    <form action={form[1]}>
      <input type="hidden" name="bankAccountId" value={bankAccountId} />
      <label htmlFor="switchShowAccount">
        Hide account{' '}
        <input
          type="checkbox"
          name="switchHideAccount"
          id="switchHideAccount"
          aria-label="Swith show account"
          onChange={() => submitButton.current?.click()}
          checked={value}
        />
      </label>
      <button
        ref={submitButton}
        type="submit"
        className="hidden"
        aria-hidden
        tabIndex={-1}
      />
    </form>
  );
}
