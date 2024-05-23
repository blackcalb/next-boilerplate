/* eslint-disable react/button-has-type */
import React from 'react';

import { cn } from '@/utils/cn';

const getTextColor = (color: BaseButtonProps['color']) => {
  switch (color) {
    case 'primary':
      return 'text-primary';
    case 'secondary':
      return 'text-secondary';
    case 'error':
      return 'text-error';
    case 'success':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'info':
      return 'text-info';
    case 'light':
      return 'text-light';
    case 'dark':
      return 'text-dark';
    default:
      return '';
  }
};
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: NonNullable<React.ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  iconStart?: React.ReactNode;
  children?: React.ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}
export const BaseButton = ({
  type,
  children,
  color,
  ...props
}: Readonly<BaseButtonProps>) => {
  const textColor = getTextColor(color);

  return (
    <button
      {...props}
      type={type}
      className={cn(
        'inline-block p-2',
        'rounded-md',
        'hover:bg-gray-200 dark:hover:bg-gray-800',
        textColor,
      )}
    >
      {children}
    </button>
  );
};
