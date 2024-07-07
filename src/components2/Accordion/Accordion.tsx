'use client';

import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { type ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';

interface AccordionProps {
  content: ReactNode;
  header: ReactNode;
  className?: string;
  expanded?: boolean;
}

export const Accordion = ({
  content,
  header,
  className,
  expanded = false,
}: Readonly<AccordionProps>) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className={cn('p-2', 'border-2 rounded-md', className)}>
      <div className="flex items-center justify-between">
        <div>{header}</div>
        <motion.div
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={{
            expanded: { rotate: 180 },
            collapsed: { rotate: 0 },
          }}
        >
          <button
            onClick={() => setIsExpanded((p) => !p)}
            type="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <FontAwesomeIcon icon={faCircleChevronDown} />
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={isExpanded ? 'visible' : 'hidden'}
        variants={{
          visible: { opacity: 1, height: 'auto' },
          hidden: { opacity: 0, height: 0 },
        }}
      >
        {content}
      </motion.div>
    </div>
  );
};
