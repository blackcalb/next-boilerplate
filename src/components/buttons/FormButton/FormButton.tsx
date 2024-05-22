'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/cn';

import BaseButton from '../BaseButton';

export const FormButton = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { pending } = useFormStatus();
  return (
    <BaseButton type="submit" disabled={pending} className={cn('flex gap-2')}>
      {pending && <FontAwesomeIcon icon={faSpinner} spin />}
      {children}
    </BaseButton>
  );
};

export default FormButton;
