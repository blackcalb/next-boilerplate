import { cn } from '@/utils/cn';

export default function Loading() {
  return (
    <dialog
      className={cn(
        'fixed left-0 top-0',
        'z-50',
        'flex size-full items-center justify-center',
        'overflow-auto bg-white/20  backdrop-blur',
      )}
    >
      Loading...
    </dialog>
  );
}
