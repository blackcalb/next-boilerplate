import Prisma from '@prisma/client';

export default async function getAccounts() {
  const prisma = new Prisma.PrismaClient();

  return prisma.accounts.findMany();
}
