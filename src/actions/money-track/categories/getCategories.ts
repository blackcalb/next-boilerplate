import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import type { CategoryType } from '@/models/money-track/Categories';
import Category from '@/models/money-track/Categories';

export default async function getCategories(type: CategoryType) {
  await dbConnect();

  const userId = await getUserId();

  return Category.find({ userId, type }, undefined, { lean: true });
}
