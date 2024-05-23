'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuCtx = createContext<MenuContextType | null>(null);

export function useMenuCtx() {
  const ctx = useContext(MenuCtx);
  if (!ctx) {
    throw new Error('useMenuCtx must be used within a MenuCtxProvider');
  }
  return ctx;
}

export function MenuProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isMenuOpen, toggleMenu }),
    [isMenuOpen, toggleMenu],
  );

  return <MenuCtx.Provider value={value}>{children}</MenuCtx.Provider>;
}
