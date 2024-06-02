'use client';

import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  initialOpen?: boolean;
}

export function Card({
  children,
  header,
  className,
  initialOpen = false,
}: Readonly<CardProps>) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <motion.div
      className={cn(
        'border-2 border-solid border-blue-200',
        'rounded-lg',
        'px-6 py-4',
        'bg-blue-100/10 backdrop-blur-sm',
        'shadow-lg',
        !isOpen && 'self-start',
        className,
      )}
    >
      <div className="mb-6 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faChevronCircleDown}
          onClick={() => setIsOpen((p) => !p)}
          rotation={isOpen ? undefined : 180}
          size="xl"
        />
        {header}
      </div>

      <motion.div
        initial={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 },
        }}
        animate={isOpen ? 'open' : 'closed'}
      >
        {children}
      </motion.div>
      {/* {isOpen && children} */}
    </motion.div>
  );
}
