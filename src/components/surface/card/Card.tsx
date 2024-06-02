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
        'overflow-hidden',
        !isOpen && 'self-start',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={isOpen ? 'open' : 'closed'}
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          animate={isOpen ? 'open' : 'closed'}
        >
          <FontAwesomeIcon
            icon={faChevronCircleDown}
            onClick={() => setIsOpen((p) => !p)}
            // rotation={isOpen ? 180 : undefined}
            size="xl"
          />
        </motion.div>
        {header}
      </div>

      <motion.div
        initial={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto', marginTop: '1rem' },
          closed: { opacity: 0, height: 0, marginTop: 0 },
        }}
        animate={isOpen ? 'open' : 'closed'}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
