import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import BaseButton from '@/components/buttons/BaseButton';
import Text from '@/components/Text';

export default function ActionsPage() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link href="/money-track/add/category">
          <BaseButton type="button">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCirclePlus} size="2x" />
              <Text>Add Category</Text>
            </div>
          </BaseButton>
        </Link>
      </div>
      <div className="flex justify-between gap-4">
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
      <div />
    </div>
  );
}
