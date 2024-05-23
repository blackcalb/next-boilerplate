import { auth } from '@/auth/auth';

export default async function getUserId() {
  const user = await auth();

  if (!user?.user?.id) {
    throw new Error('User not found');
  }

  return user.user.id;
}
