'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/utils/cn';

import BaseButton from '../BaseButton';
import type { BaseButtonProps } from '../BaseButton/BaseButton';

interface SubmitButtonIconProps
  extends Omit<BaseButtonProps, 'type' | 'iconStart' | 'iconEnd' | 'children'> {
  icon: React.ReactNode;
}

export const SubmitButtonIcon = ({
  className,
  icon,
  disabled,
  ...props
}: Readonly<Omit<SubmitButtonIconProps, 'startButton'>>) => {
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
