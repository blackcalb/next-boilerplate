'use client';

import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons/faFloppyDisk';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons/faPenToSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { updateAccountDescription } from '@/actions/money-track/accounts/updateDescription';
import BaseButton from '@/components/buttons/BaseButton';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';

interface AccountDescriptionProps {
  accountId: string;
  description?: string;
}

export const AccountDescription = ({
  accountId,
  description,
}: Readonly<AccountDescriptionProps>) => {
  const [editing, setEditing] = useState(false);
  const [state, formAction] = useFormState(updateAccountDescription, null);

  useEffect(() => {
    if (state?.status === 'success') {
      setEditing(false);
    }
  }, [state?.status]);

  return (
    <form action={formAction}>
      <div className="flex w-full items-center gap-4">
        <div className="flex-1">
          {/* TODO: improce input when is disabled */}
          <input type="hidden" name="accountId" value={accountId} />
          <Input
            label="Description"
            name="description"
            id="description"
            defaultValue={description}
            disabled={!editing}
          />
        </div>
        <div>
          {editing ? (
            <FormButton iconStart={<FontAwesomeIcon icon={faFloppyDisk} />} />
          ) : (
            <BaseButton
              type="button"
              iconStart={<FontAwesomeIcon icon={faPenToSquare} />}
              onClick={() => setEditing(true)}
            />
          )}
        </div>
      </div>
    </form>
  );
};
