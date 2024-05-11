import Prisma from '@/lib/prisma';

async function getComponents() {
  return Prisma.components.findMany();
}

export default getComponents;
