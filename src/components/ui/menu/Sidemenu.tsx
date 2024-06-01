import Link from 'next/link';

import getUser from '@/actions/auth/getUser';
import Typography from '@/components/Typography';

import SignoutButton from '../auth/SignoutButton';

export default async function Sidemenu() {
  const user = await getUser();

  return (
    <div className="flex size-full flex-col justify-between">
      <div>
        <Typography className="mb-6">Money-track</Typography>
        <Link href="/money-track/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
      </div>
      {user ? <SignoutButton /> : 'Sign in'}
    </div>
  );
}
