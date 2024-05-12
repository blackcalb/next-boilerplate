import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import BaseButton from '@/components/buttons/BaseButton';
import Text from '@/components/Text';

export default function ActionsPage() {
  return (
    <div className="flex justify-center gap-4">
      <Link href="/money-track/add/income">
        <BaseButton type="button">
          <FontAwesomeIcon icon={faPlus} size="3x" />
          <Text>Add Income</Text>
        </BaseButton>
      </Link>
      <Link href="/money-track/add/expense">
        <BaseButton type="button">
          <div>
            <FontAwesomeIcon icon={faMinus} size="3x" />
            <Text>Add Expense</Text>
          </div>
        </BaseButton>
      </Link>
    </div>
  );
}
