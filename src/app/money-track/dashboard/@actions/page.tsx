import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import BaseButton from '@/components/buttons/BaseButton';
import Typography from '@/components/Typography';

export default function ActionsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center">
        <Link href="/money-track/add/category">
          <BaseButton type="button" color="primary">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCirclePlus} size="2x" />
              <Typography>Add Category</Typography>
            </div>
          </BaseButton>
        </Link>
      </div>
    </div>
  );
}
