'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useState } from 'react';

interface SortableMenuProps<T extends { id: string }> {
  items: T[];
  render: (item: T) => React.ReactElement;
  getId: (item: T) => string;
  onSortItems?: (items: T[]) => void;
}

export const SortableMenu = <T extends { id: string }>({
  items,
  render,
  getId,
}: Readonly<SortableMenuProps<T>>) => {
  const [menuItems, setMenuItems] = useState<T[]>(items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuItems((prevItems) => {
        const oldIndex = prevItems.map(getId).indexOf(active.id);
        const newIndex = prevItems.map(getId).indexOf(over.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={menuItems.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col items-start">
          {menuItems.map((item) => render(item))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
