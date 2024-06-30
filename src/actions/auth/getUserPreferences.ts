import { get } from 'lodash';

import { auth } from '@/auth/auth';
import User from '@/models/auth/Users';

export default async function getUserPreferences(
  module: string,
): Promise<Record<string, unknown> | undefined> {
  const userFromAuth = await auth();

  if (!userFromAuth?.user?.id) {
    throw new Error('User not fount');
  }

  const user = await User.findById(userFromAuth.user.id);

  return get(user, `options.${module}`);
}
