/* eslint-disable react/button-has-type */
import React from 'react';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  type: NonNullable<React.ButtonHTMLAttributes<HTMLButtonElement>['type']>;
}
export const BaseButton = ({
  label,
  type,
  ...props
}: Readonly<BaseButtonProps>) => {
  return (
    <button
      {...props}
      type={type}
      className="inline-block rounded-md p-2 hover:cursor-grab hover:bg-gray-200 active:cursor-grabbing dark:hover:bg-gray-800"
    >
      {label}
    </button>
  );
};
