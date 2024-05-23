import Prisma from '@prisma/client';

import getUserId from '@/actions/auth/getUserId';

export async function getCurrentBudgets() {
  const prisma = new Prisma.PrismaClient();
  const userId = await getUserId();

  return prisma.budgets.findMany({
    orderBy: {
      from: 'desc',
    },
    where: {
      AND: [
        {
          from: {
            lte: new Date(),
          },
        },
        {
          to: {
            gte: new Date(),
          },
        },
        {
          userId,
        },
      ],
    },
  });
}
