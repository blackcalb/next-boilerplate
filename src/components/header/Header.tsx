import React from 'react';

import getUser from '@/actions/auth/getUser';

import SignoutButton from '../ui/auth/SignoutButton';

export async function Header() {
  const user = await getUser();

  return (
    <div className="flex min-h-14 w-full items-center justify-between px-4 py-2">
      <h1>BlackcalB</h1>

      {user && <SignoutButton />}
    </div>
  );
}
