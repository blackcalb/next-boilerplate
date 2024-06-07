'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/cn';

import BaseButton from '../BaseButton';
import type { BaseButtonProps } from '../BaseButton/BaseButton';

interface FormButtonProps extends Omit<BaseButtonProps, 'type'> {}

export const FormButton = ({
  children,
  className,
  disabled,
  ...props
}: Readonly<FormButtonProps>) => {
  const { pending } = useFormStatus();
  return (
    <BaseButton
      {...props}
      type="submit"
      disabled={disabled || pending}
      className={cn('flex gap-2', className)}
    >
      {children}
      {pending && <FontAwesomeIcon icon="spinner" spin />}
    </BaseButton>
  );
};

export default FormButton;
