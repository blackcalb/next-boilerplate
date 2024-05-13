'use server';

import Prisma from '@prisma/client';

import { NewCategorySchema } from '@/schemas/money-track/category';

export async function createNewCategory(_: any, formData: FormData) {
  const prisma = new Prisma.PrismaClient();

  const data = {
    name: formData.get('name') as string,
    type: formData.get('type') as string,
  };

  const isValid = NewCategorySchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }
  const newCategory = await prisma.categories.create({
    data,
  });

  return {
    data: newCategory,
  };
}
