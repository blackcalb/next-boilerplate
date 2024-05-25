import Prisma, { type Accounts } from '@prisma/client';

import getUserId from '@/actions/auth/getUserId';

export default async function getAccounts(): Promise<Accounts[]> {
  const prisma = new Prisma.PrismaClient();
  const userId = await getUserId();

  return prisma.accounts.findMany({
    where: {
      userId,
    },
  });
}
