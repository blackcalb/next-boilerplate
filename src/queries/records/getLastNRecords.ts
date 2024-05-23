import Prisma from '@prisma/client';

import getUserId from '@/actions/auth/getUserId';
import type { RecordType } from '@/types/moneyTrack';

export async function getLastNRecords(
  type: keyof typeof RecordType,
  n: number = 10,
) {
  const prisma = new Prisma.PrismaClient();
  const userId = await getUserId();

  return prisma.records.findMany({
    take: n,
    orderBy: {
      date: 'desc',
    },
    where: {
      type,
      userId,
    },
  });
}
