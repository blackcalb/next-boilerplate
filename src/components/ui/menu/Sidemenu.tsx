import Link from 'next/link';

import getUser from '@/actions/auth/getUser';
import Text from '@/components/Text';

import SignoutButton from '../auth/SignoutButton';

export default async function Sidemenu() {
  const user = await getUser();

  return (
    <div className="flex size-full flex-col justify-between">
      <div>
        <Text className="mb-6">Money-track</Text>
        <Link href="/money-track/dashboard">
          <Text>Dashboard</Text>
        </Link>
      </div>
      {user ? <SignoutButton /> : 'Sign in'}
    </div>
  );
}
