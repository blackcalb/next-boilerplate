'use client';

import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils/cn';

import BaseButton from '../buttons/BaseButton';

interface ModalProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
  className?: string;
  primaryAction?: React.ReactNode;
}

export function Modal({
  children,
  title,
  className,
  primaryAction,
}: Readonly<ModalProps>) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <dialog
      className={cn(
        'fixed left-0 top-0',
        'z-50',
        'flex size-full items-center justify-center',
        'overflow-auto bg-white/20  backdrop-blur',
      )}
    >
      <div
        className={cn(
          'm-auto flex flex-col gap-10',
          'bg-black p-8 rounded-md',
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div>{title}</div>
          <BaseButton type="button" onClick={goBack}>
            <FontAwesomeIcon icon={faClose} size="2x" />
          </BaseButton>
        </div>
        <div className="">{children}</div>
        <div className="flex w-full flex-row-reverse">
          {primaryAction && <div>{primaryAction}</div>}
        </div>
      </div>
    </dialog>
  );
}
