'use server';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Category from '@/models/money-track/Categories';
import { NewCategorySchema } from '@/schemas/money-track/category';

export async function createNewCategory(_: any, formData: FormData) {
  await dbConnect();
  const userId = await getUserId();

  const data = {
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    userId,
  };

  const isValid = NewCategorySchema.safeParse(data);

  if (isValid.error) {
    return {
      error: isValid.error.format(),
    };
  }
  const newCategory = await Category.create(data);

  return {
    data: newCategory,
  };
}
