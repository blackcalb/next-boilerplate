'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/cn';

import BaseButton from '../BaseButton';
import type { BaseButtonProps } from '../BaseButton/BaseButton';

interface FormButtonIconProps
  extends Omit<BaseButtonProps, 'type' | 'iconStart' | 'iconEnd' | 'children'> {
  icon: React.ReactNode;
}

export const FormButtonIcon = ({
  className,
  icon,
  disabled,
  ...props
}: Readonly<Omit<FormButtonIconProps, 'startButton'>>) => {
  const { pending } = useFormStatus();

  return (
    <BaseButton
      {...props}
      type="submit"
      disabled={disabled || pending}
      className={cn('flex gap-2', className)}
    >
      <div className={cn(pending && 'animate-spin')}>{icon}</div>
    </BaseButton>
  );
};
