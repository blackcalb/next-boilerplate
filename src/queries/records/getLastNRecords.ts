import Prisma from '@prisma/client';

import type { RecordType } from '@/types/moneyTrack';

export async function getLastNRecords(
  type: keyof typeof RecordType,
  n: number = 10,
) {
  const prisma = new Prisma.PrismaClient();

  return prisma.records.findMany({
    take: n,
    orderBy: {
      date: 'desc',
    },
    where: {
      type,
    },
  });
}
