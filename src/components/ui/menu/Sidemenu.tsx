import getUser from '@/actions/auth/getUser';

import SignoutButton from '../auth/SignoutButton';

export default async function Sidemenu() {
  const user = await getUser();

  return (
    <>
      title
      {user ? <SignoutButton /> : 'Sign in'}
      <SignoutButton />
    </>
  );
}
