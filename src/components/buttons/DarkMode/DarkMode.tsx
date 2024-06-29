'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useCallback, useMemo } from 'react';

export function DarkMode() {
  const { theme, setTheme } = useTheme();

  const initialState = useMemo(() => {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  const handleSwitchTheme = useCallback(() => {
    if (theme === 'system') {
      setTheme(initialState === 'dark' ? 'light' : 'dark');
      return;
    }
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme, initialState]);

  return (
    <button
      type="button"
      className="relative flex h-9 w-16 justify-center rounded-full border-2 border-black bg-slate-200 dark:border-white dark:bg-slate-800"
      onClick={handleSwitchTheme}
      aria-label="Switch theme color"
    >
      <motion.div
        className="size-8 rounded-full bg-black dark:bg-white"
        variants={{
          light: {
            x: '-50%',
          },
          dark: {
            x: '50%',
          },
        }}
        initial={initialState}
        animate={theme}
        transition={{ duration: 0.2 }}
      />
      <div className="absolute left-1 top-1 text-primary">
        <FontAwesomeIcon icon={faSun} />
      </div>
      <div className="absolute right-1 top-1 text-secondary">
        <FontAwesomeIcon icon={faMoon} />
      </div>
    </button>
  );
}
