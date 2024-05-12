'use client';

import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

import BaseButton from '../buttons/BaseButton';

interface ModalProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  primaryAction?: React.ReactNode;
}

export function Modal({
  children,
  title,
  primaryAction,
}: Readonly<ModalProps>) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <dialog className="fixed left-0 top-0 z-50 flex size-full items-center justify-center overflow-auto bg-white/20  backdrop-blur">
      <div className="m-auto flex min-w-[33vw] flex-col gap-10 bg-black p-8">
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
