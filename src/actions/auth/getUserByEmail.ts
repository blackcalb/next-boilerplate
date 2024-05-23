import Prisma from '@prisma/client';

export async function getUserByEmail(email: string) {
  const prisma = new Prisma.PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return undefined;
  }

  return user;
}
