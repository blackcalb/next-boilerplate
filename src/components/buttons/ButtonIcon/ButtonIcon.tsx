import React from 'react';

import { cn } from '@/utils/cn';

import BaseButton from '../BaseButton';
import type { BaseButtonProps } from '../BaseButton/BaseButton';

interface ButtonIconProps
  extends Omit<BaseButtonProps, 'type' | 'iconStart' | 'iconEnd' | 'children'> {
  icon: React.ReactNode;
}

export const ButtonIcon = ({
  className,
  icon,
  disabled,
  ...props
}: Readonly<Omit<ButtonIconProps, 'startButton'>>) => {
  return (
    <BaseButton
      {...props}
      type="button"
      disabled={disabled}
      className={cn('flex gap-2', className)}
    >
      <div>{icon}</div>
    </BaseButton>
  );
};
