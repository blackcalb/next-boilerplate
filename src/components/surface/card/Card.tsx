import React from 'react';

import { Text } from '@/components/Text/Text';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function Card({ children, title, className }: Readonly<CardProps>) {
  return (
    <div
      className={cn(
        'size-full',
        'border-2 border-solid border-blue-200',
        'rounded-lg',
        'px-6 py-4',
        'bg-blue-100/10 backdrop-blur-sm',
        'shadow-lg',
        className,
      )}
    >
      <div className="mb-6 flex w-full justify-center">
        <Text variant="h3">{title}</Text>
      </div>
      {children}
    </div>
  );
}
