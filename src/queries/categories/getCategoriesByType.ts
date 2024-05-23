import Prisma from '@prisma/client';

import getUserId from '@/actions/auth/getUserId';

export default async function getCategoriesByType(type: string) {
  const prisma = new Prisma.PrismaClient();
  const userId = await getUserId();

  return prisma.categories.findMany({
    where: {
      type,
      userId,
    },
  });
}
