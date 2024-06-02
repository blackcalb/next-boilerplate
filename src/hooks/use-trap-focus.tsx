/* eslint-disable consistent-return */
import { type RefObject, useEffect } from 'react';

export default function useTrapFocus(el: RefObject<HTMLDialogElement>) {
  useEffect(() => {
    const modalElement = el.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modalElement.addEventListener('keydown', handleTabKeyPress);

    return () => {
      modalElement.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [el]);
}
