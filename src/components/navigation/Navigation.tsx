import React from 'react';

import { MenuToggleButton } from '../menu/Menu';

export const Navigation = () => {
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <MenuToggleButton />
      <div className="flex flex-1 justify-center">Navigation</div>
    </div>
  );
};
