import Prisma from '@prisma/client';

import getUserId from '@/actions/auth/getUserId';

export default async function getAccounts() {
  const prisma = new Prisma.PrismaClient();
  const userId = await getUserId();

  return prisma.accounts.findMany({
    where: {
      userId,
    },
  });
}
