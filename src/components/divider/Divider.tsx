import { cn } from '@/utils/cn';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: Readonly<DividerProps>) {
  return (
    <div
      className={cn('h-px w-full', 'bg-slate-700 dark:bg-slate-300', className)}
    />
  );
}
