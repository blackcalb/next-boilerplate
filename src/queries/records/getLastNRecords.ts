import Prisma from '@prisma/client';

import { sleep } from '@/utils/sleep';

enum RecordType {
  income = 'income',
  expense = 'expense',
}

export async function getLastNRecords(
  type: keyof typeof RecordType,
  n: number = 10,
) {
  const prisma = new Prisma.PrismaClient();

  await sleep(Math.random() * 1000 + 500);

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
