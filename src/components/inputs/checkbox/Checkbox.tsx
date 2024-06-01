import React from 'react';

import { Input } from '../input/Input';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  helper?: string | React.ReactNode;
  errors?: string[];
}

export const Checkbox = ({
  label,
  helper,
  errors,
  ...props
}: Readonly<CheckboxProps>) => {
  return (
    <>
      <label
        htmlFor={props.id ?? props.name}
        aria-label={label}
        className="flex gap-2"
      >
        <Input
          {...props}
          type="checkbox"
          label={label}
          id={props.id ?? props.name}
        />
        {label}
      </label>
      {!!helper && helper}
      <div>
        {errors?.map((error) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
    </>
  );
};
