import { cn } from '@/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

export function Select({
  className,
  id,
  label,
  options,
  ...props
}: Readonly<SelectProps>) {
  return (
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
  );
}
