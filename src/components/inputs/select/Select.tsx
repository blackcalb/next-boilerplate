import { cn } from '@/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  id: string;
  errors?: string[];
}

export function Select({
  className,
  id,
  label,
  options,
  errors,
  ...props
}: Readonly<SelectProps>) {
  return (
    <>
      <label htmlFor={id}>
        {label}
        <select id={id} className={cn('p-4 w-full', className)} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
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
