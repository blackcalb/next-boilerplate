import Prisma from '@prisma/client';

export default async function getCategoriesByType(type: string) {
  const prisma = new Prisma.PrismaClient();
  return prisma.categories.findMany({
    where: {
      type,
    },
  });
}
