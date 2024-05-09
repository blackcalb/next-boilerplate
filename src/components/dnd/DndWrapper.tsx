'use client';

import { DndContext } from '@dnd-kit/core';
import type { Props as DndContextProps } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import React from 'react';

interface DndWrapperProps extends DndContextProps {
  children: React.ReactNode;
}

export const DndWrapper = ({ children }: Readonly<DndWrapperProps>) => {
  return <DndContext>{children}</DndContext>;
};
