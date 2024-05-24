/* eslint-disable react/button-has-type */
import React from 'react';

import { cn } from '@/utils/cn';

const borderByColor: Record<ButtonColors, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  error: 'border-error',
  success: 'border-success',
  warning: 'border-warning',
  info: 'border-info',
  light: 'border-light',
  dark: 'border-dark',
};

function getBorderColor(color: ButtonColors, kind: BaseButtonProps['kind']) {
  switch (kind) {
    case 'text':
    case 'contained':
      return 'border-transparent';
    case 'outlined':
      return borderByColor[color];
    default:
      return '';
  }
}

const backgroundByColor: Record<ButtonColors, string> = {
  primary: 'bg-primary hover:bg-primary/90',
  secondary: 'bg-secondary',
  error: 'bg-error',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  light: 'bg-light',
  dark: 'bg-dark',
};

const getBackgroundColor = (
  color: ButtonColors,
  kind: BaseButtonProps['kind'],
) => {
  switch (kind) {
    case 'text':
    case 'outlined':
      return 'bg-transparent';
    case 'contained':
      return backgroundByColor[color];
    default:
      return '';
  }
};
const textByColor: Record<ButtonColors, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  light: 'text-light',
  dark: 'text-dark',
};

const getColor = (color: ButtonColors, kind: BaseButtonProps['kind']) => {
  switch (kind) {
    case 'text':
    case 'outlined':
      return textByColor[color];
    case 'contained':
      return `text-white dark:text-gray-900`;
    default:
      return '';
  }
};

type ButtonColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: NonNullable<React.ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  children?: React.ReactNode;
  className?: string;
  color?: ButtonColors;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  kind?: 'text' | 'outlined' | 'contained';
}
export const BaseButton = ({
  type,
  children,
  className,
  iconStart,
  iconEnd,
  color = 'primary',
  kind = 'text',
  ...props
}: Readonly<BaseButtonProps>) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'inline-block',
        'rounded-md',
        getBorderColor(color, kind),
        'border-2 border-solid',
        getColor(color, kind),
        `hover:${getBackgroundColor(color, kind)}/80 hover:scale-110 transition-all`,
        getBackgroundColor(color, kind),
        className,
      )}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
};
