import { auth } from '@/auth/auth';

export default async function getUser() {
  return auth();
}
