'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { MenuProvider, useMenuCtx } from '@/hooks/context/menu';

export const MenuWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isMenuOpen } = useMenuCtx();
  return (
    <MenuProvider>
      <motion.div
        className="flex size-full flex-col"
        animate={isMenuOpen ? 'open' : 'closed'}
        initial={{
          x: '-200px',
          width: 0,
        }}
        variants={{
          closed: { x: '-200px', width: 0 },
          open: { x: 0, width: '200px' },
        }}
      >
        <div className="size-full px-4 pt-10">{children}</div>
      </motion.div>
    </MenuProvider>
  );
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    // stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    className="stroke-black dark:stroke-white"
    {...props}
  />
);

export const MenuToggleButton = () => {
  const { isMenuOpen, toggleMenu } = useMenuCtx();
  return (
    <motion.button
      type="button"
      onClick={toggleMenu}
      aria-label="toggle menu"
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          initial={{ opacity: 0 }}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  );
};
