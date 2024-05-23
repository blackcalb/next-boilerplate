'use server';

import { signOut } from '@/auth/auth';

export default async function SignOut() {
  await signOut();
}
