import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string | React.ReactNode;
  errors?: string[];
}

export function Input({
  className,
  label,
  placeholder,
  id,
  name,
  helper,
  errors,
  ...props
}: Readonly<InputProps>) {
  return (
    <>
      <label htmlFor={id} aria-label={label}>
        <input
          {...props}
          className={cn('p-4 w-full', className)}
          id={id ?? name}
          name={name}
          placeholder={placeholder || label}
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
}
