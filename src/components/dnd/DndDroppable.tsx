'use client';

import { useDroppable } from '@dnd-kit/core';

interface DndDroppableProps {
  children: React.ReactNode;
  id: string;
}

export function DndDroppable({ children, id }: Readonly<DndDroppableProps>) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}/</div>;
}
