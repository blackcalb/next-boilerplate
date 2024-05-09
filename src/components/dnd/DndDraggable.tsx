'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cloneElement } from 'react';

interface DndDraggableProps {
  children: React.ReactNode;
  id: string;
  handler?: React.ReactNode;
}

export function DndDraggable({
  children,
  id,
  handler,
}: Readonly<DndDraggableProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const hasHandler = Boolean(handler);

  if (hasHandler) {
    return (
      <div
        style={style}
        className="flex items-center gap-2"
        {...attributes}
        ref={setNodeRef}
      >
        {cloneElement(handler as React.ReactElement, {
          ...listeners,
        })}
        {children}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
