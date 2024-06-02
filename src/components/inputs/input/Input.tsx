import React, { forwardRef, type ForwardRefRenderFunction } from 'react';

import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  helper?: string | React.ReactNode;
  errors?: string[];
  ref?: React.Ref<HTMLInputElement>;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, label, placeholder, id, name, helper, errors, ...props },
  ref,
) => {
  return (
    <>
      <label htmlFor={id} aria-label={label}>
        <input
          {...props}
          className={cn('p-4 w-full', className)}
          id={id ?? name}
          name={name}
          placeholder={placeholder || label}
          ref={ref}
        />
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

export const Input = forwardRef(InputComponent);
