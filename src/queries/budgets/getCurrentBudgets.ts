import Prisma from '@prisma/client';

export async function getCurrentBudgets() {
  const prisma = new Prisma.PrismaClient();

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
      ],
    },
  });
}
