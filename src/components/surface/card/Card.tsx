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
  doNotMinimize?: boolean;
  savePreference?: string;
}

export function Card({
  children,
  header,
  className,
  initialOpen = false,
  doNotMinimize = false,
  savePreference,
}: Readonly<CardProps>) {
  const [isOpen, setIsOpen] = useState(initialOpen || doNotMinimize);

  const onChangeOpen = () => {
    setIsOpen(!isOpen);
    if (!savePreference) return;
    fetch('/api/user/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        module: savePreference,
        value: !isOpen,
      }),
    });
  };

  return (
    <motion.div
      className={cn(
        'w-full',
        'border-2 border-solid border-blue-200',
        'rounded-lg',
        'px-2 py-2',
        'bg-blue-100/10 backdrop-blur-sm',
        'shadow-lg',
        'overflow-hidden',
        !isOpen && 'self-start',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {!doNotMinimize && (
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
              onClick={onChangeOpen}
              size="xl"
            />
          </motion.div>
        )}
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
